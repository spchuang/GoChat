import pachi_py
import sys, io, os
import flask
from flask import Flask, request, json, jsonify, Response, make_response, send_from_directory, send_file
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api,reqparse
from gevent.pywsgi import WSGIServer
from gevent import monkey
# need to patch sockets to make requests async
monkey.patch_all()

app = Flask("PachiAPI", static_url_path='')
cors = CORS(app, resources={r"*": {"origins": "*"}})
api = Api(app)
app.debug = True


class Move(Resource):    
    def get(self):
        """
        Get new move from PACHI given board matrix and stone color.
        ---
        tags:
            -   move
        consumes:
            - application/json
        produces:
            - application/json 
        
                                           
        parameters:        
            -   in: body
                name: body                 
                schema:
                    properties:
                        board_format:
                            description: format of the board, matrix or ij_history
                        board:
                            description: Board data in two dimentional array
                            type: array
                            items:
                                type: array
                                items: integer
                        board_size:
                            description: board size
                        stone_color:
                            description: Stone color for the generated move. 2:Black or 1:White
                            type: integer
                        return_board:
                            description: Return the board in matrix. 0:False or 1:True.
                            type: integer                  
                example:
                    |-
                        {"stone_color": 1,"board": [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],"return_board": 1}
                            
                        
        """    
        try:
            req_data = request.get_json(force=True)
            print(req_data)
        except:
            return make_response(jsonify({"error":"Invalid payload"}), 500)  
        board_format = req_data.get('board_format', 'matrix')
        board = req_data.get('board',[[]])                
        stone_color = req_data.get('stone_color',0)        
        return_board = req_data.get('return_board',False)
        pachi_board = pachi_py.CreateBoard(19)
        if board_format == 'matrix':
            self.make_board_matrix(pachi_board, board)
        elif board_format == 'ij_history':
            stone_color = 2 if stone_color=='Black' else 1
            self.make_board_ij_history(pachi_board, board)
        else:
            return make_response(jsonify({"error":"Invalid payload"}), 500)  
        _pe=pachi_py.PyPachiEngine(pachi_board,'uct','threads=8,playout=light,maximize_score')        
        
        next_move = _pe.genmove(stone_color,'')
        _pe.curr_board.play_inplace(next_move, stone_color)
        print(_pe.curr_board.coord_to_ij(next_move))
        resp = jsonify({
            'move_str':_pe.curr_board.coord_to_str(next_move),
            'move_ij':_pe.curr_board.coord_to_ij(next_move),
            'stone_color':stone_color,
            'board':_pe.curr_board.encode()[0].tolist() if return_board else None})
        del _pe

        return make_response(resp,200)

    def make_board_ij_history(self, pachi_board, board_history):        
        for stone in board_history:
            stone_color = 2 if stone['color']=='Black' else 1
            pachi_board.play_inplace(pachi_board.ij_to_coord(stone['x'],stone['y']), stone_color)                                                              
        return pachi_board

    def make_board_matrix(self, pachi_board, board_matrix):        
        for y, row in enumerate(board_matrix):
            for x, cell in enumerate(row):                
                if cell not in [1,2]: continue
                pachi_board.play_inplace(pachi_board.ij_to_coord(y,x), cell)                                                              
        return pachi_board
        


api.add_resource(Move, '/move')

from flask_swagger import swagger
@app.route("/spec")
@cross_origin()
def spec():
    swag = swagger(app)
    swag['info']['version'] = '1.0.0'
    swag['info']['title'] = "GoChatAI API"
    return make_response(jsonify(swag))
    
@app.route("/healthcheck")
@cross_origin()
def healthcheck():    
    return make_response(jsonify({'status':'Healthcheck OK'}))

@app.route('/doc')
@cross_origin()
def doc(path='index.html'):
    print('doc')
    return send_file('static/dist/index.html')

def main():
    "Start gevent WSGI server"
    print('starting server..')
    http = WSGIServer(('', 5000), app.wsgi_app)
    http.serve_forever()


if __name__ == '__main__':
    main()