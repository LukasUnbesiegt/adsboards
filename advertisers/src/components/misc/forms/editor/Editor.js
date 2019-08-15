import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import styles from './Editor.module.css'
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';





class EditorComponent extends Component {




    constructor(props) {
        super(props)

        const html = this.props.content ? this.props.content : '';

        const contentBlock = htmlToDraft(html)

        if (contentBlock) {

            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)

            this.state = {

                editorState,

            }

        }



    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {

        const { input } = this.props;


        return (
            <div className="container my-3 py-3">
                <div className="">

                    <div className="col-12">

                        <h4>{this.props.description}</h4>
                        <Editor
                            wrapperClassName={styles.editorwrapper}
                            editorClassName={styles.editor}
                            editorState={this.state.editorState}
                            onEditorStateChange={
                                this.onEditorStateChange

                            }
                            onChange={
                                (contentState) => {
                                    // input.onChange(contentState)
                                    let htmlContents = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
                                    input.onChange(htmlContents)
                                }

                            }
                        />
                    </div>

                </div>


            </div>
        )
    }
}



export default EditorComponent