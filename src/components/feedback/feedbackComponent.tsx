import { useEffect, useState } from "react";
import { request, requestWithBody, requestWithQuerry } from "@/api/apiService";
import {
  createFeedback,
  deleteFeedback,
  getFeedbackFor,
  getMyFeedbackFor,
  methods,
  updateFeedback,
} from "@/api/constants";
import { PageSize } from "@/common/paginationConstants";
import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import FeedBackDialog from "./feedbackDialog/feedbackDialog";
import AddNewComment from "./notMyComment/addNewComment";
import MyComment from "./myComment/myComment";
import CommentComponent from "./comment/Comment";
import log from "webpack-mock-server/lib/log";

interface FeedbackComponentProps {
  entityId: string;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ entityId }): JSX.Element => {
  if (!entityId) {
    return <></>;
  }

  const user = useSelector<RootState, User>((el) => el.user);
  const [comments, setComments] = useState<FeedbackConstant[]>([]);
  const [myComment, setMyComment] = useState<FeedbackConstant>();
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [isOpen, setOpen] = useState(false);

  const [textValue, setTextValue] = useState("");
  const [starsValue, setStarsValue] = useState(5);

  const loadMine = async () => {
    const data = await request(getMyFeedbackFor(entityId, user.id), methods.GET);
    const parsed = await data.json();
    if (parsed.status === 404 || parsed.statusCode === 404) {
      setMyComment(undefined);
      return;
    }
    setMyComment(parsed);
    setTextValue(parsed.text);
    setStarsValue(parsed.stars);
  };

  const loadMore = async () => {
    const data = await requestWithQuerry(getFeedbackFor(entityId), methods.GET, {
      limit: PageSize,
      offset: currentPage,
    });
    const parsed = await data.json();

    if (parsed.error) return;

    setComments((cm) => [...cm, ...parsed.data]);
    setHasMore(parsed.limit + parsed.offset < parsed.total);
    setCurrentPage((s) => s + 1);
  };

  useEffect(() => {
    async function loadPrikoli() {
      await loadMine();
      await loadMore();
    }
    loadPrikoli();
  }, []);

  const showMore = async () => {
    await loadMore();
  };

  const removeComment = async () => {
    if (!myComment) {
      return;
    }

    await request(deleteFeedback(myComment.id), "DELETE");
    await loadMine();

    setTextValue("");
    setStarsValue(1);
  };
  const updateComment = async () => {
    if (!myComment) {
      return;
    }
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
      {console.log("myComment", myComment)}
      {myComment && <MyComment comment={myComment} setOpen={setOpen} removeComment={removeComment} />}
      <FeedBackDialog
        setOpen={setOpen}
        isOpen={isOpen}
        updateComment={updateComment}
        textValue={textValue}
        setTextValue={setTextValue}
        starsValue={starsValue}
        setStarsValue={setStarsValue}
      />
      {!myComment && (
        <AddNewComment
          textValue={textValue}
          setTextValue={setTextValue}
          starsValue={starsValue}
          setStarsValue={setStarsValue}
          sendComment={sendComment}
        />
      )}

      {comments?.length > 0 && <CoolLabel>Feedbacks</CoolLabel>}
      <div>
        {comments
          .filter((comment) => comment.creator_Id !== user.id)
          .map((comment) => (
            <CommentComponent comment={comment} />
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
