import bodyParser from "body-parser";
import fs from 'fs'
import { type } from "os";
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '..', 'typing_test.json')
var Test


var urlencodedParser = bodyParser.urlencoded({extended: true});

let level = 0
function evaluateTypingTest(askedText, givenText, t) {
    let askedWords = askedText.trim().split(/\s+/)
    let givenWords = givenText.trim().split(/\s+/)

    let totalWords = givenWords.length
    let totalCharacters = givenText.length

    let correctWords = 0
    for (let i = 0; i < Math.min(askedWords.length, givenWords.length); i++) {
        if (askedWords[i] === givenWords[i]) {
            correctWords++
        }
    }

    let correctCharacters = 0
    for (let i = 0; i < Math.min(askedText.length, givenText.length); i++) {
        if (askedText[i] === givenText[i]) {
            correctCharacters++
        }
    }

    let wpm = (totalWords / t) * 60
    let cpm = (totalCharacters / t) * 60

    let wordAccuracy = (correctWords / givenWords.length) * 100
    let charAccuracy = (correctCharacters / givenText.length) * 100

    let errorCount = givenWords.length - correctWords

    let netWpm = ((correctWords - errorCount) / t) * 60
    netWpm = Math.max(netWpm, 0)

    return {
        totalWords: totalWords,
        totalCharacters: totalCharacters,
        correctWords: correctWords,
        correctCharacters: correctCharacters,
        wpm: wpm.toFixed(2),
        cpm: cpm.toFixed(2),
        wordAccuracy: wordAccuracy.toFixed(2),
        charAccuracy: charAccuracy.toFixed(2),
        errorCount: errorCount,
        netWpm: netWpm.toFixed(2)
    }
}


export default function typingController(app){
    
    app.get('/',(req,res)=>{
        res.render('home')
    })


    
    app.get('/typetest',function(req,res){
        res.render('typetest',{Tests: Test})
       
    })

    app.post('/typetest',urlencodedParser,(req,res)=>{
        const level = req.body.level
        const time = req.body.time
        const keys = req.body.keys 
        const emphasis = req.body.emphasis
        const random = req.body.random
        fs.readFile(filePath, 'utf-8', (err, rawData) => {
        if (err) {
            console.error('Error reading file:', err)
            return
        }
        try {
            const jsonObject = JSON.parse(rawData)
            Test = jsonObject[level][keys][emphasis][random]
            res.render('typetest',{Test})

            console.log("Keys ",keys)
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr)
        }
        })


    })


    app.get('/typetest/result',(req,res)=>{
        const typedText = req.query.TypedText
        console.log(typedText)
        const temp= "The quick brown fox jumps over the lazy dog. Consistent practice builds muscle memory. Numbers like 123 and symbols like @#$ appear often. Consistent practice builds muscle memory. Shortcuts like Ctrl+C and Ctrl+V save time. Real world typing includes unexpected challenges. Consistent practice builds muscle memory. Numbers like 123 and symbols like @#$ appear often. Real world typing includes unexpected challenges. Emails and reports need both speed and accuracy. Quotes like 'Stay hungry, stay foolish' inspire. Typing fast is a useful skill in modern workspaces. Use commas, periods, and question marks correctly. Emails and reports need both speed and accuracy. Use commas, periods, and question marks correctly. The quick brown fox jumps over the lazy dog. Typing fast is a useful skill i"
        let evaluation = evaluateTypingTest(Test,typedText ,60)
        console.log('WPM',evaluation.wpm)
        console.log("Text",typedText)
        res.render('typeresult',{evaluation})
    })
  
}