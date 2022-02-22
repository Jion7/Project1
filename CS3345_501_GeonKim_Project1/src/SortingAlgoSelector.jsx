import React, {useState} from 'react' ;

export function SortingAlgoSelector (props){
    //set currnetSelected using usestate
    const sortsNames= ['Insertion','Selection','Quick','Heap', 'Merge','Radix'];
    return (<div>  
    {
        sortsNames.map((name) => {
                        {/*click function it will check what sorting method is clicked */}

            return <div style={{cursor : "pointer"}}>
                {props.cur === name ? <p style={{fontWeight : "bold"}} onClick={()=>{props.setter(name)}}>{name} Sort</p>
        : <p onClick={()=>{props.setter(name)}}>{name} Sort</p>}</div>
            
        }
        )
    }
    </div>)
}