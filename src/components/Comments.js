import React ,{useState} from 'react'
import './Comments.css'
import { FaStar } from "react-icons/fa";
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};


const Comments = (props) => {
    const styles = {
        container: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        },
        stars: {
          display: "flex",
          flexDirection: "row",
        },
        textarea: {
          border: "1px solid #a9a9a9",
          borderRadius: 5,
          padding: 10,
          margin: "20px 0",
          minHeight: 100,
          width: 300
        },
        button: {
          border: "1px solid #a9a9a9",
          borderRadius: 5,
          width: 300,
          padding: 10,
        }
      
      };
    const handleClick = value => {
        setCurrentValue(value)
        
      }
    
      const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
      };
    
      const handleMouseLeave = () => {
        setHoverValue(undefined)
      }
  
  const handleSubmit = (e) =>{
      
      e.preventDefault();
      console.log(userComment);
      props.addRating(props.selected.imdbID,currentValue,userComment)
      props.settrigger(false)
  }

  const handleChange = (e) => {
      setUserComment(e.target.value)
  }

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [userComment,setUserComment] =useState("")
    const stars = Array(5).fill(0)
    

  return (props.trigger) ? (
    <div className='comment-popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => {props.settrigger(false)  }}>Close</button>
            <div style={styles.container}>
      <h3> Movie Rating </h3>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
      <textarea
        placeholder="What's your Review?"
            onChange={handleChange}
        style={styles.textarea}
       
      />

<input type="submit" value="Submit" />
      </form>
      
    </div>

            
            { props.children}
        </div>
    </div>
  ) : "";

 
  
}

export default Comments