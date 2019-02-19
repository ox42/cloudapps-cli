import React from 'react';

import { connect } from 'react-redux';
import { createNote, loadNotes } from '../../store/notes';

class AddNotePage extends React.Component {
    state = {
        title: '',
        content: '',

        internalError: null
    };

    componentWillMount() {
        if (!this.props.notes && !this.props.isLoadingNotes && !this.props.failedLoadingNotes) {
            this.props.loadNotes();
        }
    }

    submitForm() {

        this.setState({ internalError: null });
        if (!this.state.title || !this.state.content){
            this.setState({ internalError: 'Please complete all fields and try again!' });
            return /* don't submit form */;
        }

        this.props.createNote(this.state.title, this.state.content);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">

                        <form className="form note-form mt-4" style={{opacity: this.props.isUpdatingNote ? 0.3 : 1}} onSubmit={(event) => { event.preventDefault(); this.submitForm(); }}>
                            <h2 className="text-center mt-1 mb-4">Add note</h2>

                            {(this.state.internalError || this.props.failedUpdatingNote) ? <p className="form-error">{ this.state.internalError || 'Failed to create note. Please try again.' }</p> : ''}

                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" id="title" name="title" autoFocus
                                       placeholder="Enter a title" value={this.state.title} onChange={event => this.setState({ title: event.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Note content</label>
                                <textarea className="form-control" id="content" name="content"
                                       placeholder="Enter the content..." value={this.state.content} rows={5} maxLength={140} onChange={event => this.setState({ content: event.target.value })} />
                            </div>

                            <div className="text-right">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
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
        failedLoadingNotes: state.notes.failedLoadingNotes,

        isUpdatingNote: state.notes.isUpdatingNote,
        failedUpdatingNote: state.notes.failedUpdatingNote
    }
};

function mapDispatchToProps(dispatch) {
    return {
        loadNotes: () => { dispatch(loadNotes()); },
        createNote: (title, content) => { dispatch(createNote(title, content)); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotePage);
