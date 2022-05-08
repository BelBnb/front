import { useEffect, useState } from "react";
import { request, requestWithBody, requestWithQuerry } from "@/api/apiService";
import { createFeedback, deleteFeedback, getFeedbackFor, getMyFeedbackFor, updateFeedback } from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import DialogComponent from "@/elements/common/dialog/dialog";

interface FeedbackComponentProps {
  entityId: string;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ entityId }): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);
  const [comments, setComments] = useState<FeedbackConstant[]>([]);
  const [myComment, setMyComment] = useState<FeedbackConstant | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [isOpen, setOpen] = useState(false);

  const [textValue, setTextValue] = useState("");
  const [starsValue, setStarsValue] = useState(5);

  const loadMine = async () => {
    const data = await request(getMyFeedbackFor(entityId, user.id), "GET");
    const parsed = await data.json();
    if (parsed.statusCode !== 404) {
      setMyComment(parsed);
      setTextValue(parsed.text);
      setStarsValue(parsed.stars);
    } else setMyComment(undefined);
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
    await request(deleteFeedback(myComment.id), "DELETE");
    await loadMine();

    setTextValue("");
    setStarsValue(1);
  };
  const updateComment = async () => {
    const data = await requestWithBody(updateFeedback(myComment.id), "PATCH", { text: textValue, stars: starsValue });
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
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
          >
            Update
          </button>
        </div>
      )}
      <DialogComponent
        cancelLabel="Back"
        setOpen={setOpen}
        submitLabel="Submit"
        title="Update comment"
        submitHandler={async () => {
          await updateComment();
        }}
        isOpen={isOpen}
      >
        <input
          placeholder={"Text"}
          type="text"
          name="text"
          value={textValue}
          onChange={(event) => setTextValue(event?.target?.value || "")}
        />
        <input
          placeholder={"Stars"}
          type="number"
          name="stars"
          min={1}
          max={5}
          value={starsValue}
          onChange={(event) => setStarsValue(Number(event?.target?.value) || 5)}
        />
      </DialogComponent>
      {!myComment && (
        <div>
          <label>
            Text:
            <input
              value={textValue}
              type="text"
              name="text"
              onChange={(event) => setTextValue(event?.target?.value || "")}
            />
          </label>
          <label>
            Stars:
            <input
              value={starsValue}
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
