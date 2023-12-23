import axios from "axios";
import './UI/PolicyPage.css'

export default function PolicyPage() {
    const downloadPdf = () => {
        // Specify the URL for downloading the PDF from your server
        const pdfUrl = "http://localhost:3002/policy/download/"; // Replace with your server URL

        axios
            .get(pdfUrl, {
                responseType: "blob", // Set the responseType to 'blob' for binary data (e.g., PDF)
            })
            .then((response) => {
                // Create a Blob URL for the PDF
                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);

                // Create an invisible anchor tag and trigger the download
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "policy.pdf"; // Specify the name for the downloaded file
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error downloading PDF:", error);
            });
    };
    return (
        <div className="page">
            <div className="policy">
                <div className="policy__wrapper">
                    <h1 className="policy__title">Политика</h1>

                    <div className="policy__download">
                        <p className="policy__text">Скачать Политику (pdf)</p>
                        {/* TODO: make a link to pdf */}
                        <button onClick={downloadPdf} className="policy__link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M27.9834 7.96766V22.7523C27.9834 23.7167 27.1985 24.5013 26.2343 24.5013H20.9878C20.5039 24.5013 20.1128 24.1103 20.1128 23.6272C20.1128 23.1433 20.5039 22.7523 20.9878 22.7523H26.2343V8.75756H20.1128C19.6297 8.75756 19.2386 8.36656 19.2386 7.88262V1.69926H10.5C10.017 1.69926 9.61888 1.36875 9.61888 0.885687C9.61888 0.40175 10.01 0.0107422 10.4939 0.0107422H20.1128C20.132 0.0107422 20.1478 0.0203859 20.1661 0.0212626C20.2458 0.0265228 20.3228 0.0423033 20.3989 0.0686043C20.4269 0.078248 20.454 0.0852616 20.4802 0.0975353C20.5695 0.13874 20.6526 0.191342 20.7253 0.262355C20.7279 0.264985 20.7305 0.265861 20.7323 0.268492L27.6325 7.16899C27.6605 7.18827 27.6745 7.22246 27.699 7.24526C27.7244 7.26893 27.7436 7.29611 27.7664 7.32241C27.9011 7.47583 28.0009 7.66169 28.0009 7.88262C28.0009 7.9133 27.9869 7.93873 27.9834 7.96766ZM20.9878 2.99678V7.00855H24.9979L20.9878 2.99678ZM10.5464 3.52017C10.6269 3.52543 10.703 3.54033 10.7791 3.56751C10.8071 3.57715 10.8343 3.58417 10.8614 3.59644C10.9497 3.63764 11.0338 3.69025 11.1055 3.76126C11.1081 3.76389 11.1108 3.76477 11.1134 3.7674L18.0128 10.6679C18.0408 10.6872 18.0548 10.7214 18.0801 10.7442C18.1055 10.7678 18.1248 10.7941 18.1466 10.8204C18.2814 10.9747 18.3811 11.1606 18.3811 11.3815C18.3811 11.4113 18.3671 11.4368 18.3645 11.4666V26.2512C18.3645 27.2156 17.5796 28.0002 16.6154 28.0002H1.74825C0.784875 28.0002 0 27.2156 0 26.2512V5.25866C0 4.29429 0.784875 3.50965 1.74825 3.50965H10.4939C10.5122 3.50965 10.528 3.51929 10.5464 3.52017ZM11.368 6.49568V10.5066H15.3781L11.368 6.49568ZM9.61888 11.3815V5.20606H1.75L1.74825 26.2512H16.6154V12.2196H10.5C10.017 12.2196 9.61888 11.8646 9.61888 11.3815Z"
                                    fill="#393939"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
