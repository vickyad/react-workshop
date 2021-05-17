import React, { useEffect, useState } from 'react'
import Piece from '../piece'
import { useEvent } from '../utils'
import './styles.css'

const Board: React.FC = () => {
    const UP_ARROW = 38
    const DOWN_ARROW = 40
    const LEFT_ARROW = 37
    const RIGHT_ARROW = 39

    const [gameState, setGameState] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    
    const initialize = () => {
        let newGrid = [...gameState];
        addNumber(newGrid);
        addNumber(newGrid);
        setGameState(newGrid);
    }

    const addNumber = (newGrid: number[]) => {
        let added = false
        let left_spaces: number[] = []
        
        newGrid.forEach((value, index) => {
            if(value === 0) {
                left_spaces.push(index)
            }
        })

        if(left_spaces.length === 0) {
            return
        }
        
        while (!added) {    
            let position = Math.floor(Math.random() * left_spaces.length)
            if (newGrid[left_spaces[position]] === 0) {
                newGrid[left_spaces[position]] = Math.random() > 0.5 ? 2 : 4
                added = true
            }
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
          case UP_ARROW:
            handleSwipeUp()
            break;
          case DOWN_ARROW:
            handleSwipeDown()
            break;
          case LEFT_ARROW:
            handleSwipeLeft()
            break;
          case RIGHT_ARROW:
            handleSwipeRight()
            break;
          default:
            break;
        }
    } 

    const handleSwipeLeft = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = i * 4
            let piece_index_2 = piece_index_1 + 1
            
            while(piece_index_1 < (i + 1) * 4) {
                if(piece_index_2 === (i + 1) * 4) {
                    piece_index_2 = piece_index_1 + 1
                    piece_index_1++
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2++
                } else if (newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1++
                        piece_index_2 = piece_index_1 + 1
                    }
                }
            }
        }

        setGameState(newArray)
        addNumber(newArray)
    }

    const handleSwipeRight = () => {
        let newArray = [...gameState]

        for (let i = 0; i < 4; i++) {
            let piece_index_1 = (i + 1) * 4 - 1
            let piece_index_2 = piece_index_1 - 1

            while(piece_index_2 > i * 4 - 1) {
                if(piece_index_2 === -1) {
                    piece_index_2 = piece_index_1 - 1
                    piece_index_1--
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2--
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1--
                        piece_index_2 = piece_index_1 - 1
                    }
                }
            }
        }

        setGameState(newArray)
        addNumber(newArray)
    }

    const handleSwipeUp = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = i
            let piece_index_2 = piece_index_1 + 4

            while(piece_index_1 < (i + 1) * 4) {
                if(piece_index_2 > 12 + i) {
                    piece_index_1+=4
                    piece_index_2 = piece_index_1 + 4
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2+=4
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1+=4
                        piece_index_2 = piece_index_1 + 4
                    }
                }
            }
        }
        
        setGameState(newArray)
        addNumber(newArray)
    }

    const handleSwipeDown = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = 12 + i
            let piece_index_2 = piece_index_1 - 4

            while(piece_index_1 > i) {
                if(piece_index_2 < i) {
                    piece_index_1-=4
                    piece_index_2 = piece_index_1 - 4
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2-=4
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1-=4
                        piece_index_2 = piece_index_1 - 4
                    }
                }
            }
        }

        setGameState(newArray)
        addNumber(newArray)
    }

    useEffect(() => {
        initialize()
    }, [])

    useEvent("keydown", handleKeyDown)

    return(
        <div className="board">
            {gameState.map((digit, index) => 
                <Piece num={digit} key={index} />
            )}
        </div>
    )
}
export default Board