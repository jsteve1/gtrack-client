import { FileUploader } from "react-drag-drop-files";
import { Modal } from 'react-bootstrap';
export default function UploadModal({ uploadModalShow, setUploadModalShow, setProfilePic }) {
    const fileTypes = ["JPEG", "PNG", "GIF", "WEBM", "WEBP", "JPG", "BMP"];
    const handleFileChange = (file) => {
        console.log("File uploaded", file);
        setProfilePic(file);
        setUploadModalShow(false);
    };
    return (
        <>
            <style type="text/css">
            {`
                .drop-area {
                    background-color: #191919;
                    height: 300px;
                    width: 65vw;
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
            />
            </Modal>
        </>
    )
}