/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import hotelsApi from "@/api/hotels/hotelsApi";
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

const HotelsContainer = ({
  name,
  city,
  priceL,
  priceB,
}: {
  name: string;
  city: string;
  priceL: number;
  priceB: number;
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  useEffect(async () => {
    const payload = await hotelsApi.getAllHotels();
    const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
    setHotels(res || []);
  }, []);

  //const hotels = useSelector<RootState, Hotel[]>((app) => app.hotels);
  const [isOpen, setIsOpen] = useState(false);
  const [polygonItem, setPolygonItem] = useState<{
    hotel: Hotel;
    method: "delete" | "update";
  }>();
  const [editableItem, setEditableItem] = useState<Hotel>({
    id: "",
    name: "",
    authorId: "",
    city: "",
    description: "",
    images: "",
    location: { coordinates: [], type: "" },
  });

  const [files, setFiles] = useState<File[]>();

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
      toast.promise(hotelsApi.deleteHotel(polygonItem.hotel.id), {
        success: "Deleted",
        pending: "In progress",
        error: "Error",
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onFileUpload();
    }
  };

  const cancelHandler = () => {
    setIsOpen(false);
  };

  const updateEditableProp = (e: string | number | File, prop: keyof Hotel) => {
    setEditableItem((prevState) => ({ ...prevState, [prop]: e }));
    console.log(editableItem);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const onFileUpload = () => {
    const formData = new FormData();
    console.log(files);
    console.log(polygonItem?.hotel);
    console.log(editableItem);
    if (!files || !polygonItem?.hotel || !editableItem) {
      toast.error("Select file pizdoglazoye mudilo");
      return;
    }
    files.forEach((file) => {
      formData.append("images", file, file.name);
    });
    Object.keys(editableItem).forEach((key) => {
      if (key === "location") {
        return;
      }
      formData.append(key, editableItem[key] || "");
    });
    formData.append("lat", "0");
    formData.append("long", "0");
    toast.promise(hotelsApi.updateHotel(polygonItem?.hotel.id, formData), {
      pending: "Updating",
      success: "Updated",
      error: "Somthing went wrong",
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
            <input type="file" multiple id="qw-item" hidden onChange={(e) => onFileChange(e)} />
            <label htmlFor="qw-item">Pick an images</label>
          </div>
        )}
      </DialogComponent>
    </div>
  );
};

export default HotelsContainer;
