import './App.css';
import React, {useState,useEffect} from 'react';
import {marked} from 'marked'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'




const App = () => {
  const [code, setCode] = useState('## Hello')
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>')
const [toggle,setToggle]=useState('')
const [activePanel, setactivePanel] = useState("case1");
const [data, setData] = useState([]);
const [localData,setLocalData]=useState([])

const baseURL='https://www.markdownguide.org'

useEffect(() => {
  
  axios.get(`${baseURL}/api/v1/basic-syntax.json`).then((res) => {
      console.log(res.basic_syntax);
      setToggle(res.data)
  }).catch((err) => {
      console.log(err);
  })

}, [])


useEffect(() => {
  localStorage.setItem('Data', JSON.stringify(data));
}, [data]);



const handleChange = (e) => {
  setCode(e.target.value)
  setCompiled(marked.parse(e.target.value))
}
  const panelCase = {
    case1: <div> <textarea onChange={handleChange} value={code}/> </div>,
    case2: <div style={{color:'white'}}> <ReactMarkdown>{code}</ReactMarkdown> </div>,
    case3: <div> <textarea value={compiled}/> </div>,
    case4: <div> <textarea value={localData}/> </div>
  }

  

const openMD = () => {
    setactivePanel("case1");
  }
 const getData=()=>{
   setactivePanel("case4")
  const retreivedData=localStorage.getItem("Data")
  if(retreivedData){
    setLocalData(JSON.parse(retreivedData))
  }
 }

  const openPreview = () => {
    setData(code)
    console.log(code);
    setactivePanel("case2")
  }
  const openDocs = () => {
    setactivePanel("case3")
  }

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns d-flex" style={{justifyContent:"space-between"}}>
          <button onClick={openMD} className="btn">MarkDown</button>
          <button onClick={getData} className="btn">Your Data</button>
          <button onClick={openPreview} className="btn">Preview</button>
          <button onClick={openDocs} className="btn-info">Docs</button>
        </div>
        
          {
            panelCase[activePanel]
          }
      </div>
    </>
  )
}


export default App;
