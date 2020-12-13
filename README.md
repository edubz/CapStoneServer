# PCC Creative Coding Capstone Project
## [theinput.tk](https://capstone-public-server.herokuapp.com/)

This is a permanent web-based sound installation made by Portland Community College creative coding students. 

Sound is recorded and played back [at this webpage](https://capstone-public-server.herokuapp.com/) using the p5.js sound library and sent to a database using a node.js server
![webpage screenshot](https://github.com/edubz/CapStoneServer/blob/master/screenshot2.png)

The audio files are then downloaded by another node.js server on a remote machine and processed using Max, and the processed output is streamed back to the webpage with Icecast
![max patch screenshot](https://github.com/edubz/CapStoneServer/blob/master/screenshot.png)