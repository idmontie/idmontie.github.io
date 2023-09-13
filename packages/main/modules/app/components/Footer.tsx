function GithubIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-full w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
        >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

function DevToIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-full w-4"
            viewBox="100 100 312 312"
            fill="currentColor"
        >
            <path d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z" />
        </svg>
    );
}

function MediumIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-full w-4"
            viewBox="0 -55 256 256"
            version="1.1"
            preserveAspectRatio="xMidYMid"
        >
            <g>
                <path
                    d="M72.2009141,1.42108547e-14 C112.076502,1.42108547e-14 144.399375,32.5485469 144.399375,72.6964154 C144.399375,112.844284 112.074049,145.390378 72.2009141,145.390378 C32.327779,145.390378 0,112.844284 0,72.6964154 C0,32.5485469 32.325326,1.42108547e-14 72.2009141,1.42108547e-14 Z M187.500628,4.25836743 C207.438422,4.25836743 223.601085,34.8960455 223.601085,72.6964154 L223.603538,72.6964154 C223.603538,110.486973 207.440875,141.134463 187.503081,141.134463 C167.565287,141.134463 151.402624,110.486973 151.402624,72.6964154 C151.402624,34.9058574 167.562834,4.25836743 187.500628,4.25836743 Z M243.303393,11.3867175 C250.314,11.3867175 256,38.835526 256,72.6964154 C256,106.547493 250.316453,134.006113 243.303393,134.006113 C236.290333,134.006113 230.609239,106.554852 230.609239,72.6964154 C230.609239,38.837979 236.292786,11.3867175 243.303393,11.3867175 Z"
                    fill="currentColor"
                ></path>
            </g>
        </svg>
    );
}

export function Footer() {
    return (
        <footer className="width-full border-top bg-gray-light my-4 mx-auto max-w-[1200px] p-4">
            <div className="mb-6 flex justify-center"></div>

            <div className="flex-justify-between flex px-3 text-gray-700 dark:text-gray-300">
                <div className="flex flex-1 flex-row items-center gap-6">
                    <div className="flex flex-row items-center gap-2">
                        <a
                            href="https://github.com/idmontie"
                            target="_blank"
                            rel="noopener noreferrer"
                            type="button"
                            className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5"
                        >
                            <GithubIcon />
                        </a>
                        <a
                            href="https://dev.to/idmontie"
                            target="_blank"
                            rel="noopener noreferrer"
                            type="button"
                            className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5"
                        >
                            <DevToIcon />
                        </a>
                        <a
                            href="https://medium.com/@ivanmontiel"
                            target="_blank"
                            rel="noopener noreferrer"
                            type="button"
                            className="m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5"
                        >
                            <MediumIcon />
                        </a>
                    </div>
                    <div>|</div>
                    <div>
                        <a
                            href="/rss.xml"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            RSS Feed
                        </a>
                    </div>
                </div>
                <div className="flex self-end">
                    <button
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}
                    >
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
}
