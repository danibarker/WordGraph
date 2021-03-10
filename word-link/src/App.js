import React, { useState, useRef } from 'react'
import { useTransition, useSpring, useChain, config } from 'react-spring'
import { Global, Container, Item, Page, Menu, Instruction} from './styles'
import data from './data'

export default function App() {
    const [open, set] = useState(false)
    const [page, setPage] = useState('instructions')
    const springRef = useRef()
    const { width, height, opacity, ...rest } = useSpring({
        ref: springRef,
        config: config.stiff,
        from: { width: '20%', height: '20%', background: 'hotpink' },
        to: { width: open ? '100%' : '20%', height: open ? '100%': '20%', background: open ? 'white' : 'hotpink' }
    })

    const transRef = useRef()
    const transitions = useTransition(open ? data : [], item => item.name, {
        ref: transRef,
        unique: true,
        trail: 200 / data.length,
        from: { opacity: 0, transform: 'scale(0)' },
        enter: { opacity: 1, transform: 'scale(1)' },
        leave: { opacity: 0, transform: 'scale(0)' }
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springRef, transRef] : [transRef, springRef], [0.1, open ? 0.1 : 0.6])

    return (
        <>
            <Global />
            <Menu >
                <Container style={{ ...rest, height: height, width: width }} onClick={() => set(open => !open)}>
                   
                {transitions.map(({ item, key, props }) => (
                    <Item onClick={() => {
                        setPage(item.page)
                    }} key={key} style={{ ...props, background: item.css }}>{item.text}</Item>
                ))}
                
            </Container></Menu>
            <Page page={page}>
                <h1>{page}</h1>
                {page === "instructions" ? <>
                    <p>Click on the <span style={{ color: "hotpink", fontWeight: "700" }}>box</span> above to choose either Puzzle or Find</p>
                    <div style={{ marginTop:"20px",width: "100%", display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                        <Instruction >
                            <h4>Puzzle instructions</h4>
                            <p>1. Enter a word and a chain length</p>
                            <p>2. Try to reach the end of the chain in the least number of moves by:</p>
                            <p>&emsp;a. Changing 1 letter to another eg. CAT-&gt;BAT</p>
                            <p>&emsp;b. Removing 1 letter eg. CAT-&gt;AT</p>
                            <p>&emsp;c. Adding 1 letter eg. CAT-&gt;CHAT</p>
                            <p>&emsp;d. Rearranging the current letters eg. CAT-&gt;ACT</p>
                        </Instruction>
                        <Instruction >
                            <h4>Find instructions</h4>
                            <p>1. Enter a starting word</p>
                            <p>2. Choose an option:</p>
                            <p>&emsp;a. Longest: find the word that has the largest optimal chain from the starting word</p>
                            <p>&emsp;b. Optimal: Find the optimal chain from the starting word to a second chosen word</p>
                            
                        </Instruction>
                    </div>
                </>
                    :<></>
            }
            </Page>
        </>
    )
}



