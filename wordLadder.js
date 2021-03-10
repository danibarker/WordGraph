const fs = require('fs')

class Node {
    constructor(value) {
        this.value = value
    }
}
class Link {
    constructor(source, target) {
        this.source = source
        this.target = target
    }
}

class Graph {
    constructor(nodes = [], links = {}) {
        this.nodes = nodes
        this.links = links
    }

    addNode(node) {
        this.nodes.push(node)
    }
    addLink(link) {
        if (this.links[link.source]) {
            this.links[link.source].push(link.target)
        } else {
            this.links[link.source] = [link.target]
        }
        if (this.links[link.target]) {
            this.links[link.target].push(link.source)
        } else {
            this.links[link.target] = [link.source]
        }
    }
    breadth_first_search(src, dest, prev, dist) {
        const queue = []
        const visited = Array(this.nodes.length).fill(false)
        for (let i = 0; i<visited.length; i++) {
            dist[i] = Infinity
            prev[i] = -1
        }
        let current = this.nodes.indexOf(src)
        visited[current] = true
        dist[current] = 0
        queue.push(src)

        while (queue.length != 0) {
            let u = `${queue[0]}`
            queue.shift()
            for (let node of this.links[u]) {
                if (visited[node] === false) {
                    visited[node] = true
                    dist[node] = dist[+u] + 1
                    prev[node] = u
                    queue.push(node)
                    if (node === dest) {
                        return true
                    }
                }
            }
        }
        if (!dest) {
            // if destination is not provided, return distances to all nodes
            return dist
        }
        return false
    }

    findChains(source) {
        const prev = Array(this.nodes.length).fill(0)
        const dist = Array(this.nodes.length).fill(0)
        let chains = this.breadth_first_search(source, null, prev, dist)
        return chains
    }

    findShortestPath(key, source, dest) {
        let answer = ''
        const prev = Array(this.nodes.length).fill(0)
        const dist = Array(this.nodes.length).fill(0)
        if (!this.breadth_first_search(source, dest, prev, dist)) {
            return `No link between ${key[source]} and ${key[dest]}`
        }
        const path = []
        let crawl = +dest
        path.push(key[crawl])
        while (prev[crawl] != -1) {
            path.push(key[+prev[crawl]])
            crawl = +prev[crawl]
        }
        answer += `Shortest path length is: ${dist[dest]}`
        answer += '\nPath is: '
        answer += path.reverse().join('-->')
        return answer
    }

    
}


const twl = JSON.parse(fs.readFileSync('./twl.json'))
const indexed = JSON.parse(fs.readFileSync('./indexed_TWL.json'))
const nodes = JSON.parse(fs.readFileSync('./nodes.json'))
const links = JSON.parse(fs.readFileSync('./links.json'))
const graph = new Graph(nodes, links)

const ladder = (word1, word2) => {
    word1 = indexed[word1.toUpperCase()]
    word2 = indexed[word2.toUpperCase()]
    answer = graph.findShortestPath(twl, word1, word2)
    return answer
}

const findChain = (word, length) => {
    word = indexed[word.toUpperCase()]
    let answer = graph.findChains(word)
    let possibleAnswers = answer.reduce((array, chainLength, index) => {
        if (chainLength === length) {
            array.push(twl[index])
        }
        return array
    }, [])
    return possibleAnswers
}
const findLongestChain = (word) => {
    word = indexed[word.toUpperCase()]
    let answer = graph.findChains(word)
    let max = -1
    let maxWord = ''
    answer.forEach((chainLength, index) => {
        if (chainLength > max && chainLength != Infinity) {
            max = chainLength
            maxWord = twl[index]
        }
    })
    return [maxWord, max]
}

module.exports =  { findLongestChain, findChain, ladder, Graph, Node, Link }