export default function Player({ videoLink }) {
    console.log(videoLink);
    return (
        <iframe
            width="100%"
            className="aspect-video"
            src={videoLink}
            title="Some video title"
            frameBorder=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
