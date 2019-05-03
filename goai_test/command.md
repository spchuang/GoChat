Go AI test (playground droplet files)

command to run:
> java -jar kgsGtp.jar hirakaru.conf

> cat gochat.conf
# Run kgsGTP in the directory where Pachi lives.  On Windows, maybe you
# will need to replace ./pachi with pachi.exe.
#
# Adjust threads=2 to how many CPU cores you want Pachi to use.
#
# If you have a lot of RAM, you can also increase max_tree_size
# (it is in megabytes; use about total_RAM_available/2).
#
# Pachi can make smart use of Canadian byoyomi.
# Remember to also download and unpack the extra patterns from the homepage!
# Room: English Game Room, Computer Go
engine=./pachi/pachi -f ./pachi/book.dat -d 4 threads=1,max_tree_size=500,banner=Homepage+at+http://pachi.or.cz/
name=GoChat
password=8himgy
room=English Game Room
mode=auto
automatch.rank=5k
gameNotes=Hi checkout playmessengergo.com
talk=I cannot talk
rules=chinese
rules.boardSize=19
rules.time=1:30+25/3:30
verbose=t
reconnect=f
undo=f
hint.noArguing=We apparently do not agree about dead stones. Please undo your last pass move and capture / clarify life of the stones - it will not cost you points (chinese rules).


> root@playground:~# cat hirakaru.conf 
# Run kgsGTP in the directory where Pachi lives.  On Windows, maybe you
# will need to replace ./pachi with pachi.exe.
#
# Adjust threads=2 to how many CPU cores you want Pachi to use.
#
# If you have a lot of RAM, you can also increase max_tree_size
# (it is in megabytes; use about total_RAM_available/2).
#
# Pachi can make smart use of Canadian byoyomi.
# Remember to also download and unpack the extra patterns from the homepage!
# Room: English Game Room, Computer Go
engine=./pachi/pachi -f ./pachi/book.dat -d 4 threads=1,max_tree_size=500,banner=Homepage+at+http://pachi.or.cz/
name=hirakaru
password=a3vg83
room=English Game Room
mode=auto
automatch.rank=8k
gameNotes=Hi checkout playmessengergo.com
talk=I cannot talk
rules=chinese
rules.boardSize=19
rules.time=1:30+25/3:30
verbose=t
reconnect=f
undo=f
hint.noArguing=We apparently do not agree about dead stones. Please undo your last pass move and capture / clarify life of the stones - it will not cost you points (chinese rules).

root@playground:~# ls
gochat.conf  hirakaru.conf  kgsGtp3311.zip  kgsGtp-3.5.10  kgsGtp-3.5.10.tar.gz  kgsGtp.jar  pach
