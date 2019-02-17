import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/default.json';

import { connect } from 'react-redux';
import { loadNotes } from '../../store/notes';

import LoadingSpinner from "../../components/LoadingSpinner";

class DashboardPage extends React.Component {

    componentWillMount() {
        if (!this.props.notes && !this.props.isLoadingNotes && !this.props.failedLoadingNotes) {
            this.props.loadNotes();
        }
    }

    renderNote(note) {

        return (
            <div className="col-12 col-md-6 col-lg-4" key={'note-' + note.id}>

                <div className="card text-left mt-2 mb-3">
                    <div className="card-body">
                        <h5 className="card-title">
                            {note.title}</h5>
                        <p className="card-text">
                            {note.content}</p>

                        <p className="text-right mb-0"><Link to={`/user/note/${note.id}/edit`} className="card-link">Edit note</Link></p>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">

                        <h2 className="mb-4">{config.APP_NAME}</h2>
                        {(!this.props.notes) ? <LoadingSpinner/> : ''}

                        {(this.props.notes && this.props.notes.length === 0)
                            ? (<div><p className="mt-4 mb-5 py-3">You don't have any notes.<br />Start by creating one using the button below.</p></div>)
                            : ''}

                        <div className="row">
                            {(this.props.notes && this.props.notes.length > 0)
                                ? (this.props.notes.map(note => this.renderNote(note)))
                                : ''}
                        </div>


                        <p className="mt-4 text-right">
                            <Link to="/user/note/add" className="btn btn-primary">Add note</Link>
                        </p>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        notes: state.notes.notes,
        isLoadingNotes: state.notes.isLoadingNotes,
        failedLoadingNotes: state.notes.failedLoadingNotes
    }
};

function mapDispatchToProps(dispatch) {
    return {
        loadNotes: () => { dispatch(loadNotes()); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
