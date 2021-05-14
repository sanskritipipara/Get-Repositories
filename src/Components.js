import React, {  useEffect, useState } from 'react';
import { Input } from 'antd';
import Block from './Block';
const { TextArea } = Input;


const Components = () => {

    var today = new Date();
    var LastWeek = new Date( today.getTime()-(7*24*60*60*1000));
    var date = LastWeek.getFullYear() + '-' + (LastWeek.getMonth()+1) + '-' + (LastWeek.getDate())

    const [data, setData] = useState([])
    const [Language, setLanguage] = useState("") 
    const [Loading, setLoading] = useState(true) 


    useEffect(() => {
        getData();
    }, []);

    const getData =() => {
        fetchData().then(data => {
            if(data.error){
                console.log(data.error)
                setLoading(false)

            }
            else {
                setData(data.items)
                setLoading(false)
            }
        })
    }

    const fetchData = () => {
       return fetch(`https://api.github.com/search/repositories?q=language:${Language}&created:${date}&per_page=100`, {method:"get"})
        .then(response => {
            return response.json();
         })
        .catch(err => console.log(err));
    } 

    const handleChange = (e) => {
        setLanguage(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        
        e.preventDefault()
        setLoading(true)

        getData() 
        ShowList()
           
        setLanguage("");
             
    }

    const ShowList = () =>  {
        if(!data) return (
            <h3>No matches found</h3>
        );

        return (
                !Loading ?
                <div>
                    <h3  style={{ marginLeft:'20px'}}>Showing latest results </h3>
                <hr/>
                
                {data && data.map((object, index) => (
                    <React.Fragment key={index}>
                        <Block 
                        name = {object.full_name}
                        description = {object.description}
                        language = {object.language}
                        />
                        <hr/>
                    </React.Fragment>
                ))}
                </div>
        
                : <h4 style={{margin:'50px'}}>Loading..</h4>
        )
    }
        
    return (
        <div>

            <div style={{padding:'15px', marginBottom:'30px', backgroundColor:'orange'}}>
                
                <h2>Search Github Repositories of the week</h2>
                
                <form style={{ display: 'flex', paddingBottom:"30px" , paddingTop:'20px'}} 
                onSubmit={onSubmit}
                >
                    <TextArea
                        style={{  marginLeft:'50px',marginRight:'-10px',width: '40%', borderRadius: '4px' }}
                        onChange={handleChange}
                        value={Language}
                        placeholder="Search language ex-Java"
                    />

                    <button 
                        className="btn btn-small"
                        style={{  borderRadius:'5%', height:'50px', marginTop:'2px', marginLeft:'7px' }} 
                        onClick={onSubmit}
                    >
                        🔍
                    </button>

                </form>

            </div>
            
            {ShowList()}

        </div>    
    )
}
export default Components
