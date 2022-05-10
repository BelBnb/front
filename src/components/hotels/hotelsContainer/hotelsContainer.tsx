import InputElement from "@/elements/auth/inputElement/InputElement";
import DialogComponent from "@/elements/common/dialog/dialog";
import { RootState } from "@/redux/store";
import getHotelsThunk from "@/redux/thunks/hotels/getHotelsThunk";
import { Hotel } from "@/types/redux/initStates";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./styles.module.scss";

const HotelsContainer = () => {
  const hotels = useSelector<RootState, Hotel[]>((app) => app.hotels);
  const [isOpen, setIsOpen] = useState(false);
  const [polygonItem, setPolygonItem] = useState<{
    hotel: Hotel;
    method: "delete" | "update";
  }>();
  const [editableItem, setEditableItem] = useState<Hotel>();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotelsThunk());
  }, []);

  const title = () => (polygonItem?.method === "update" ? `Update ${polygonItem.hotel.name}` : `Did you think twice?`);
  const submitLabel = () => (polygonItem?.method === "update" ? `Update` : `Yes`);

  const handleUpdate = (e: Hotel) => {
    setPolygonItem({ hotel: e, method: "update" });
    setIsOpen(true);
  };
  const handleDelete = (e: Hotel) => {
    setPolygonItem({ hotel: e, method: "delete" });
    setIsOpen(true);
  };

  const submitHandler = () => {
    if (polygonItem?.method === "delete") {
      toast.error("No you don't");
    } else {
    }
  };
  const cancelHandler = () => {
    setIsOpen(false);
  };

  const updateEditableProp = (e: string | number | File, prop: keyof Hotel) => {
    setEditableItem((prevState) => {
      if (prevState) {
        return { ...prevState, [prop]: e };
      }
      return prevState;
    });
  };

  return (
    <div className={styles.hotelsWrapper}>
      <h4 className={styles.headerCaption}>Hotels</h4>
      <div className={styles.hotelsContainer}>
        {hotels.length > 0 &&
          hotels.map((el) => <HotelCard hotelItem={el} updateHandler={handleUpdate} deleteHandler={handleDelete} />)}
      </div>

      <DialogComponent
        submitLabel={submitLabel()}
        submitHandler={submitHandler}
        cancelLabel="Cancel"
        cancelHandler={cancelHandler}
        title={title()}
        isOpen={isOpen}
        setOpen={(e) => setIsOpen(e)}
      >
        {polygonItem?.method === "update" && (
          <div className={styles.dialogUpdate}>
            <InputElement placeholder="Name" onChange={(e) => updateEditableProp(e, "name")} type="text" />
            <textarea
              placeholder="Desctiption"
              onChange={(e) => updateEditableProp(e.currentTarget.value, "description")}
            />
            <InputElement placeholder="Price" onChange={(e) => updateEditableProp(e, "price")} type="text" />
            <InputElement placeholder="City" onChange={(e) => updateEditableProp(e, "city")} type="text" />
          </div>
        )}
      </DialogComponent>
    </div>
  );
};

export default HotelsContainer;
