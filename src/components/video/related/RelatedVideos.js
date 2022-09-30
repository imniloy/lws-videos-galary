import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideo from "./RelatedVideo";
import Error from './../../ui/Error';
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";

export default function RelatedVideos({ id, title }) {
    const { data: videos, isLoading, isError } = useGetRelatedVideosQuery({ id, title });
    // console.log(isError)
    let content = null;
    if (isLoading) <RelatedVideoLoader />;
    if (!isLoading && isError) content = <Error message="There is and Error" />
    if (!isLoading && !isError && videos?.length === 0) content = <Error message="No related videos Found" />;

    if (!isLoading && !isError && videos?.length > 0) {
        content = videos.map((video) =>
            <RelatedVideo key={video?.id} video={video} />
        )
    };

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
