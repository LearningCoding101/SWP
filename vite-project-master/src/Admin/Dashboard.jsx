import React from 'react'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import CourtAdmin from './AdComponents/CourtAdmin';
const Dashboard = () => {
    return (
        <div className='row'>
            <div className='container-fluid col-md-4'>
                <ul className='flex-column'>
                    <ol><Link to={'/courtAdmin'}><button>User list</button></Link></ol>
                    <ol>Courts</ol>

                </ul>
            </div>
            <div className='container-fluid col-md-8'>
                <CourtAdmin/>
            </div>
        </div>
    )
}

export default Dashboard