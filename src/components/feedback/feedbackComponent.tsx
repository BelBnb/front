import { useEffect, useState } from "react";
import { request, requestWithBody, requestWithQuerry } from "@/api/apiService";
import { createFeedback, deleteFeedback, getFeedbackFor, getMyFeedbackFor } from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";

interface FeedbackComponentProps {
  entityId: string;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ entityId }): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);
  const [comments, setComments] = useState<FeedbackConstant[]>([]);
  const [myComment, setMyComment] = useState<FeedbackConstant | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [textValue, setTextValue] = useState("");
  const [starsValue, setStarsValue] = useState(5);

  const loadMine = async () => {
    const data = await request(getMyFeedbackFor(entityId, user.id), "GET");
    const parsed = await data.json();
    if (parsed.statusCode !== 404) setMyComment(parsed);
    else setMyComment(undefined);
  };

  const loadMore = async () => {
    const data = await requestWithQuerry(getFeedbackFor(entityId), "GET", { limit: PageSize, offset: currentPage });
    const parsed = await data.json();

    setComments((comments) => [...comments, ...parsed.data]);
    setHasMore(parsed.limit + parsed.offset < parsed.total);
    setCurrentPage((s) => s + 1);
  };

  useEffect(async () => {
    await loadMine();
    await loadMore();
  }, []);

  const showMore = async () => {
    await loadMore();
  };

  const removeComment = async () => {
    const data = await request(deleteFeedback(myComment.id), "DELETE");
    await loadMine();
  };

  const sendComment = async () => {
    await requestWithBody(createFeedback, "POST", {
      creator_Id: user.id,
      object_Id: entityId,
      text: textValue,
      stars: starsValue,
    });
    await loadMine();
  };

  return (
    <>
      {myComment && (
        <div>
          <span>
            {myComment.userFirstName}-{myComment.userLastName}
          </span>
          <span>{myComment.text}</span>
          stars: {myComment.stars}
          <button onClick={removeComment}>Delete</button>
          <button onClick={removeComment}>Update</button>
        </div>
      )}
      {!myComment && (
        <div>
          <label>
            Text:
            <input type="text" name="text" onChange={(event) => setTextValue(event?.target?.value || "")} />
          </label>
          <label>
            Stars:
            <input
              type="number"
              name="stars"
              min={1}
              max={5}
              onChange={(event) => setStarsValue(Number(event?.target?.value) || 5)}
            />
          </label>
          <button onClick={sendComment}>Send</button>
        </div>
      )}

      <div>
        {comments
          .filter((comment) => comment.creator_Id !== user.id)
          .map((comment) => (
            <div>
              <span>
                {comment.userFirstName}-{comment.userLastName}
              </span>
              <span>{comment.text}</span>
              stars: {comment.stars}
            </div>
          ))}
        {hasMore && (
          <button type="button" onClick={showMore}>
            Show more
          </button>
        )}
      </div>
    </>
  );
};
export default FeedbackComponent;
