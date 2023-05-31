import os
from dotenv import load_dotenv
import requests

class App:
    def __init__(self, token):
        self.TOKEN = token

    def log(self, string):
        file = open('logs.txt', 'a')
        file.write(string + '\n')
        file.close()
        print(string)
    
    #id, accountId, puuid, profileIconId, revisionDate, summonerLevel
    def sum_by_name(self, name):
        url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"
        return requests.get(url + name + '?api_key=' + self.TOKEN).json()
    

    #list of matches in cronological order
    def match_history_by_puuid(self, puuid, start=0, count=20):
        url = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
        query = "/ids?start=" + str(start) + "&count=" + str(count) + "&api_key="
        return requests.get(url + puuid + query + self.TOKEN).json()
    
        
    #list of matches in conological order
    def match_history_by_name(self, name, start=0, count=20):
        return self.match_history_by_puuid(self.sum_by_name(name)['puuid'], start, count)
    

    #gets the match data of most recent game or inputed game
    def match_data(self, name='', number=0):
        url = "https://americas.api.riotgames.com/lol/match/v5/matches/"
        return requests.get(url + self.match_history_by_name(name)[number] + '?api_key=' + self.TOKEN).json()
    

    #gets data for named player only from most recent match inputed game
    def player_data(self, name='', number=0):
        people = self.match_data(name=name, number=number)['info']['participants']
        puuid = self.sum_by_name(name)['puuid']
        for x in people:
            if puuid == x['puuid']:
                return x
            

    #checks if player is in a game, status 404 means data not found which means is not in a active game, champ select no longer counts
    def is_in_game(self, name):
        url = 'https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'
        id = self.sum_by_name(name)['id']
        data = requests.get(url + id + "?api_key=" + self.TOKEN).json()
        if data['status']['status_code'] == 404:
            return True
        else:
            return False
        

    #gameId, gameType, gameStartTime, mapId, gameLength, platformId, gameMode, bannedChampions, gameQueueConfigId, observers, participants
    def current_game(self, name):
        url = 'https://na1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/'
        id = self.sum_by_name(name)['id']
        data = requests.get(url + str(id) + '?api_key=' + self.TOKEN)
        if data.status_code == 404:
            return False
        else:
            return data.json()
        

    #participants
    #championId, perks, profileIconId, bot, teamId, summonerName, summonerId, spell1Id, spell2Id, gameCustomizationObjects
    #team id 100 is blue/bot side, 100 is red/top side
    def current_game_stats(self, name):
        data = self.current_game(name)
        if not data:
            print("not in game")
        else:
            teams = {100 : "blue", 200 :'red'}
            string = """
            {}: {} team
            {}
            """
            for x in data['particapants']:
                player = x
                print(string.format(player['summonerName'], teams[player['teamId']], 'stats'))


    #leagueId, summonerId, summonerName, queueType, tier, rank, leageuPoints, wins, losses, hotStreak, veteran, freshBlood, inactive
    def rank(self, name):
        url = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/'
        id = self.sum_by_name(name)['id']
        return requests.get(url + id + "?api_key=" + self.TOKEN).json()
    
        
    def rank_stats(self, name):
        data = self.rank(name)[0]
        string = 'Rank: {}\nWinrate: {:.2f}% \nWins: {} Loses: {}\n'
        rank = data['tier'] + ' ' + data['rank']
        winnrate = data['wins'] / (data['wins'] + data['losses']) * 100
        return string.format(rank, winnrate, data['wins'], data['losses'])



class Player(App):
    def __init__(self, token, player=''):
        super().__init__(token)
        self.name = player


    def set_name(self, name=""):
        self.name=name
    

    def account(self):
        return self.sum_by_name(self.name)
    
    
    def match_history(self):
        return self.match_history_by_name(self.name)
    

    def match_data_all(self, number=0):
        return self.match_data(name=self.name, number=number)
    

    def match_data_self(self, number=0):
        return self.player_data(name=self.name, number=number)
    
    
    def in_game(self):
        return self.is_in_game(self.name)
    

    def current(self):
        return self.current_game(self.name)
    
    
    def current_stats(self):
        data = self.current()
        if not data:
            print("not in game")
        else:
            teams = {100 : "blue", 200 :'red'}
            string = "{}: {} team\n{}"
            with open('stats.txt', "w") as f:
                f.write("")
            for x in range(10):
                try:
                    player = data['participants'][x]
                    name = player['summonerName']
                    stats = string.format(name, teams[player['teamId']], self.rank_stats(name))
                    print(stats)
                    with open('stats.txt', 'a') as f:
                        f.write(stats + "\n")
                except:
                    pass


    def self_stats(self):
        data = self.rank(self.name)[0]
        string = 'Rank: {}\nWinrate: {:.2f}% \nWins: {} Loses: {}\n'
        rank = data['tier'] + ' ' + data['rank']
        winnrate = data['wins'] / (data['wins'] + data['losses']) * 100
        return string.format(rank, winnrate, data['wins'], data['losses'])


def main():
    load_dotenv()
    KEY = os.getenv("RIOT_API")
    player = Player(KEY, "jkf20")
    player.current_stats()

if __name__ == "__main__":
    main()