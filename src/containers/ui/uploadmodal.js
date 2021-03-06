import { FileUploader } from "react-drag-drop-files";
import { Modal } from 'react-bootstrap';
export default function UploadModal({ uploadModalShow, setUploadModalShow, handleFileChange }) {
    const fileTypes = ["JPEG", "PNG", "GIF", "WEBM", "WEBP", "JPG", "BMP"];
    return (
        <>
            <style type="text/css">
            {`
                .drop-area {
                    background-color: #191919;
                    height: 300px;
                    width: 65vw;
                    min-width: 100%;
                    color: #aaaaaa;
                    border: dashed 1px #aaaaaa;
                    font-size: 24pt;
                }
                .drop-area * {
                    font-size: 14pt !important;
                    color: #aaaaaa !important;
                }
            `}
            </style>
            <Modal 
                show={uploadModalShow} 
                onHide={() => setUploadModalShow(false)}
                centered
                >
            <FileUploader
                multiple={false}
                handleChange={handleFileChange}
                name="file"
                types={fileTypes}
                maxSize="8"
                minSize="0"
                classes="drop-area"
                label="Upload an image"
            />
            </Modal>
        </>
    )
}