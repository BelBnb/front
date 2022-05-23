/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import hotelsApi from "@/api/hotels/hotelsApi";
import InputElement from "@/elements/auth/inputElement/InputElement";
import DialogComponent from "@/elements/common/dialog/dialog";
import { Hotel } from "@/types/redux/initStates";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PageSize } from "@/common/paginationConstants";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./styles.module.scss";

const HotelsContainer = ({
  name,
  city,
  priceL,
  priceB,
  findEvent,
  invokeAddHotel,
}: {
  city: string;
  name: string;
  priceL: number;
  priceB: number;
  findEvent: boolean;
  invokeAddHotel: number;
}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const payload = await hotelsApi.getFilteredHotels({
      city,
      name,
      priceLT: priceL,
      priceGT: priceB,
      limit: PageSize,
      offset: 0,
    });
    setPage(0);
    const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
    setHotels(res || []);
    setTotal(payload.total);
  };

  const fetchDataPaginated = async () => {
    const payload = await hotelsApi.getFilteredHotels({
      name,
      city,
      priceLT: priceL,
      priceGT: priceB,
      limit: PageSize,
      offset: (page + 1) * PageSize,
    });
    setPage(page + 1);
    const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
    setHotels((s) => [...s, ...res]);
    setTotal(payload.total);
  };

  useEffect(async () => {
    await fetchData();
  }, [findEvent]);

  const [isOpen, setIsOpen] = useState(false);
  const [polygonItem, setPolygonItem] = useState<{
    hotel?: Hotel;
    method: "delete" | "update" | "create";
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

  const [creatableItem, setCreateableItem] = useState<Hotel>({
    id: "",
    name: "",
    authorId: "",
    city: "",
    description: "",
    images: "",
    location: { coordinates: [], type: "" },
  });

  const [files, setFiles] = useState<File[]>();

  const title = () =>
    polygonItem?.method === "update"
      ? `Update ${polygonItem?.hotel?.name}`
      : polygonItem?.method === "create"
      ? `Create new hotel`
      : `Did you think twice?`;
  const submitLabel = () => (polygonItem?.method === "update" ? `Update` : `Yes`);

  const handleUpdate = (e: Hotel) => {
    setPolygonItem({ hotel: e, method: "update" });
    setIsOpen(true);
  };

  useEffect(() => {
    if (invokeAddHotel > 0) {
      console.log(invokeAddHotel);
      setPolygonItem({ method: "create" });
      setIsOpen(true);
    }
  }, [invokeAddHotel]);

  const handleDelete = (e: Hotel) => {
    setPolygonItem({ hotel: e, method: "delete" });
    setIsOpen(true);
  };

  const submitHandler = () => {
    if (polygonItem?.method === "delete" && polygonItem?.hotel?.id) {
      toast.promise(hotelsApi.deleteHotel(polygonItem.hotel.id), {
        success: "Deleted",
        pending: "In progress",
        error: "Error",
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onFileUpload();
    }
    fetchData();
  };

  const cancelHandler = () => {
    setIsOpen(false);
  };

  const updateEditableProp = (e: string | number | File, prop: keyof Hotel) => {
    setEditableItem((prevState) => ({ ...prevState, [prop]: e }));
    console.log(editableItem);
  };

  const updateCreatableProp = (e: string | number | File, prop: keyof Hotel) => {
    setCreateableItem((prevState) => ({ ...prevState, [prop]: e }));
    console.log(creatableItem);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const onFileUpload = () => {
    const formData = new FormData();
    if (
      (polygonItem?.method === "create" && !files) ||
      (!polygonItem?.hotel && polygonItem?.method !== "create") ||
      !editableItem
    ) {
      toast.error("Select file");
      return;
    }

    files &&
      files.forEach((file) => {
        formData.append("images", file, file.name);
      });

    formData.append("lat", "0");
    formData.append("long", "0");
    if (polygonItem?.method == "update") {
      Object.keys(editableItem).forEach((key) => {
        if (key === "location") {
          return;
        }
        if (editableItem[key] || editableItem[key] === 1) formData.append(key, editableItem[key] || "");
      });
      toast.promise(hotelsApi.updateHotel(polygonItem?.hotel?.id, formData), {
        pending: "Updating",
        success: "Updated",
        error: {
          render(data) {
            const error = JSON.parse(data.data.request.response);
            return error.message[0];
          },
        },
      });
    }
    if (polygonItem?.method == "create") {
      Object.keys(creatableItem).forEach((key) => {
        if (key === "location") {
          return;
        }
        formData.append(key, creatableItem[key] || "");
      });

      toast.promise(hotelsApi.createHotel(formData), {
        pending: "Creating",
        success: "Created",
        error: {
          render(data) {
            const error = JSON.parse(data.data.request.response);
            return error.message[0];
          },
        },
      });
    }
  };

  return (
    <div className={styles.hotelsWrapper}>
      {hotels.length > 0 && <h4 className={styles.headerCaption}>Hotels</h4>}
      <div className={styles.hotelsContainer}>
        {hotels.length > 0 ? (
          hotels.map((el) => <HotelCard hotelItem={el} updateHandler={handleUpdate} deleteHandler={handleDelete} />)
        ) : (
          <span className={styles.noResults}>We didn't found anything</span>
        )}
      </div>
      {(page + 1) * PageSize < total && (
        <button
          onClick={() => {
            fetchDataPaginated();
          }}
        >
          Give me more
        </button>
      )}

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
              placeholder="Description"
              onChange={(e) => updateEditableProp(e.currentTarget.value, "description")}
            />
            <InputElement placeholder="Price" onChange={(e) => updateEditableProp(e, "price")} type="number" />
            <InputElement placeholder="City" onChange={(e) => updateEditableProp(e, "city")} type="text" />
            <input type="file" multiple id="qw-item" onChange={(e) => onFileChange(e)} />
            <div>
              <label htmlFor="qw-item">Pick an images</label>
            </div>
          </div>
        )}

        {polygonItem?.method === "create" && (
          <div className={styles.dialogUpdate}>
            <InputElement placeholder="Name" onChange={(e) => updateCreatableProp(e, "name")} type="text" />
            <textarea
              placeholder="Description"
              onChange={(e) => updateCreatableProp(e.currentTarget.value, "description")}
            />
            <InputElement
              placeholder="Price"
              onChange={(e) => updateCreatableProp(e, "price")}
              type="number"
              min={0}
              max={10000}
            />
            <InputElement placeholder="City" onChange={(e) => updateCreatableProp(e, "city")} type="text" />
            <input type="file" multiple id="qw-item" onChange={(e) => onFileChange(e)} />
            <div>
              <label htmlFor="qw-item">Pick an images</label>
            </div>
          </div>
        )}
      </DialogComponent>
    </div>
  );
};

export default HotelsContainer;
