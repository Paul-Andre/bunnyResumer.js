#!/usr/bin/env python
# This script is strictly for testing purposes.
# The purpose is a test sever that disables caching i.e.
# forces the webserver to always redownload the file each time it needs it.
try:
    from http import server # Python 3
except ImportError:
    import SimpleHTTPServer as server # Python 2

class MyHTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        server.SimpleHTTPRequestHandler.end_headers(self)

    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

import sys
if __name__ == '__main__':
    port = 8101
    if len(sys.argv)>1:
        port = int(sys.argv[1]);
    server.test(HandlerClass=MyHTTPRequestHandler, port=port)
