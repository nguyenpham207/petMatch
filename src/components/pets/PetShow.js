import React, { useEffect, useState } from 'react' 
import { Container, Row, Col , Card, Button, ButtonGroup} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { petDelete, petShow } from '../../api/pet'
import EditPetModal from './EditPetModal'
import UploadPetPicture from './UploadPetPictureModal'
<<<<<<< HEAD
import EditMeetModal from './EditMeetModal'
import ShowMeet from './ShowMeet'



const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetShow = ({ user, msgAlert }) => {
=======
import NewRatingModal from '../rating/NewRatingModal'
import ShowRating from '../rating/ShowRating'
 

const PetShow = (props) => {

    const { user, msgAlert } = props


console.log(msgAlert, "msgAlert here")
>>>>>>> 0b95cd9e95557b435ed73b33d99b9715299d2d43
    const [pet, setPet] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [meetModalShow, setMeetModalShow] = useState(false)
    const [uploadPictureShow, setUploadPictureShow] = useState(false)
    const [NewRatingShow, setNewRatingShow] = useState(false)
    // const [ShowRating, setShowRating] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [deleted, setDeleted] = useState(false)
    
    const { id } = useParams()
    const navigate = useNavigate()
    
  useEffect(() => { //will this useEffect run before our EditRatingModal useEffect? 
        petShow(user, id)
            .then((res) => {
                console.log('this is the user', user)
                console.log(res.data.pet)
                setPet(res.data.pet)
                console.log("this is the id in the on mount useeffect", id) //this is the id in the on mount useEffect
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Pet Failure' + error,
                    variant: 'danger'
                })
            })
    },[] )

    
    const makeRatingCards = () => {
        let ratingCards = []
        console.log("inside make rating cards before if", pet)
        if (pet && pet.rating.length >0) {
            // map over the ratings
            // produce one ShowRating component for each of them
            console.log("making rating cards if")
            ratingCards = pet.rating.map(rating => (
                <ShowRating 
                    key={rating._id}
                    rating={rating}
                    pet={pet}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
        return (ratingCards)
    }

  

    useEffect(() => {
        petShow(user, id)
            .then((res) => {
                console.log(res.data.pet)
                setPet(res.data.pet)
                console.log("this is the id in the updated useeffect", id) //this is the id in the updated useEffect
            })
<<<<<<< HEAD
        })
    } ,[])

    useEffect(() => {
        let meetCards
        if (pet) {
            console.log(pet.meets)
            if (pet.meets.length > 0) {
                meetCards = pet.meets.map(meet => (
                    <ShowMeet
                        key={meet._id}
                        meet={meet}
                        pet={pet}
                    />
                ))    
        }
    } },[pet])

    
=======
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Pet Failure' + error,
                    variant: 'danger'
                })
            })
    },[updated] ) //this use effect only runs when updated is changed. consider adding a new useeffect that runs on mount "[]"

>>>>>>> 0b95cd9e95557b435ed73b33d99b9715299d2d43

    const dogPic = require('../shared/images/defaultDog.png')
	const catPic = require('../shared/images/defaultCat.png')
	
	const setImage = (type)=>{
        if(!pet.img){
		    if(type === "DOG"){
			    return <img fluid  src={dogPic} />
		    }else{
			    return <img fluid  src={catPic} />
		    }
        }else{
            return   <img fluid style={{width:'300px', height:'300px', border: 'solid fuchsia'}} src={pet.img} />
       }
	}
    const handleDeletePet = () => {
        petDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'You Deleted Your Pet Profile',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Uh-oh',
                message: 'Your Pet Profile is Still Here' + error,
                variant: 'danger'
            })
        })
    }
    if (!pet) {
        return (
            <div>
                loading
            </div>
        )
    }

<<<<<<< HEAD
console.log('before generating meet card, looking at pet', pet)
//     let meetCards
//     if (pet) {
//         console.log(pet.meets)
//         if (pet.meets.length > 0) {
//             meetCards = pet.meets.map(meet => (
//                 <ShowMeet
//                     key={meet._id}
//                     meet={meet}
//                     pet={pet}
//                 />
//             ))    
//     }
// }
 
=======
    // let ratingCards
    // if (pet) {
    //     if (pet.rating.length > 0) {
    //         // map over the ratings
    //         // produce one ShowRating component for each of them
    //         ratingCards = pet.rating.map(rating => (
    //             <ShowRating 
    //                 key={rating._id}
    //                 rating={rating}
    //                 pet={props.pet}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
  
>>>>>>> 0b95cd9e95557b435ed73b33d99b9715299d2d43
    // oneliner
    if (deleted) navigate('/petmatch')

    if (!pet) {
        return<p>Loading...</p>
    }

    return (
			<>
				<Container className='mt-5 mx-auto'>
                   
                    <Row className=''>
                    <Col xl={1}>
                        </Col>
                        <Col className='mx-auto mt-5'>
                      
                        {setImage(pet.typeOfPet)}
                        
                        <Card.Body>
                           { 
                             pet.owner && user && pet.owner._id === user._id 
                                ?
                            <Row>
                                
                            <Button onClick={() => setEditModalShow(true)} className=" m-1 userbutton" variant="info">
                                Edit {pet.name}'s Profile
                            </Button>
                            <Button onClick={() => setUploadPictureShow(true)} className=" m-1 userbutton" variant="secondary">
                                Edit {pet.name}'s Picture
                            </Button>
                            <Button onClick={() => handleDeletePet()}
                                className=" m-1 userbutton"
                                variant="danger"
                            >
                               Delete { pet.name }'s Profile
                            </Button>
                            
                        </Row>
                        :
                        null
                    }
                    </Card.Body>
                        </Col>
                        <Col xl={6}>
                        <Container fluid style={{width:"100%"}}>
                        <Card className='mt-5'>
                        <Card.Header><h1 style ={{color:'#eb50b8'}}>Hi! My name is {pet.name}</h1> </Card.Header>
                       <Card.Body>
                            <h3>I am a {pet.typeOfPet}, more specifically I am a {pet.breed}!</h3>
                            <h4>Likes: {pet.likes}</h4>
                        </Card.Body> 
                        <Col xl={1}>
                        </Col>
                        
                        <div className="footer">
                        </div>   
                        <Card.Footer>
                        <div>
                                Available for a play date: { pet.available ? 'yes' : 'no' }
                        </div><br/>
<<<<<<< HEAD
                        <div>
                        <Button onClick={() => setMeetModalShow(true)} className="m-2" variant="info">
                                Let's go!
                        </Button>
                        {/* <Container style={cardContainerLayout}>
                            {meetCards}
                        </Container> */}
                        </div>
                        </Card.Footer>
                        {/* <Button onClick={() => setNewRatingShow(true)} className="m-2" variant="info">
                                Rate your date !
                        </Button> */}
=======
                        </Card.Footer>
                        <Button onClick={() => setNewRatingShow(true)} className="m-2" variant="info">
                                Rate your date with { pet.name }!
                        </Button>
                        {/* <Button onClick={() => setNewRatingShow(true)} className="m-2" variant="info">
                            View { pet.name }'s Ratings
                        </Button> */}
    
>>>>>>> 0b95cd9e95557b435ed73b33d99b9715299d2d43
                        </Card>
                        <Container>
                        {pet ? makeRatingCards():<p>rating cards go here</p>}
                        </Container>
                        </Container>
                        <Col>
                        {/* <Container style={cardContainerLayout}>
                            {meetCards}
                        </Container> */}
                        </Col>
                        </Col>
                        <Col>
                            <EditPetModal 
                                user={user}
                                pet={pet}
                                show={editModalShow}
                                msgAlert={msgAlert}
                                triggerRefresh={() => setUpdated(prev => !prev)}
                                handleClose={() => setEditModalShow(false)}
                            />
                        </Col>
                        <Row>
                        <Col>
                        <EditMeetModal 
                            user={user}
                            pet={pet}
                            show={meetModalShow}
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setMeetModalShow(false)}/>
                        </Col>
                        <Col>
                        <UploadPetPicture 
                            user={user}
                            pet={pet}
                            show={uploadPictureShow}
                            msgAlert={msgAlert}
                            triggerRefresh={() => setUpdated(prev => !prev)}
                            handleClose={() => setUploadPictureShow(false)}/>
                        </Col></Row>
                        
                    </Row>
                    {/* <Col>
<<<<<<< HEAD
=======
                            <ShowRating
                                user={user}
                                pet={pet}
                                // show={ShowRating}
                                msgAlert={msgAlert}
                                triggerRefresh={() => setUpdated(prev => !prev)}
                                handleClose={() => setShowRating(false)}
                            />
                        </Col> */}

                        <Col>
>>>>>>> 0b95cd9e95557b435ed73b33d99b9715299d2d43
                            <NewRatingModal
                                user={user}
                                pet={pet}
                                show={NewRatingShow}
                                msgAlert={msgAlert}
                                triggerRefresh={() => setUpdated(prev => !prev)}
                                handleClose={() => setNewRatingShow(false)}
                            />
                        </Col> */}
                    </Container>
                
			</>
		)
}



export default PetShow