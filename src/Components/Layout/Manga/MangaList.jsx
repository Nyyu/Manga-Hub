import React, { useEffect, useContext } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

import MangaContainer from "./MangaContainer";

import MangaContext from "../../Context/Mangas/MangaContext";
import { fetchMangas } from "../../Context/Mangas/MangaActions";

function MangaList() {
    const { dispatch, loading, mangas } = useContext(MangaContext);

    useEffect(() => {
        const getMangas = async () => {
            dispatch({ type: "SET_LOADING" });
            const data = await fetchMangas();

            dispatch({
                type: "SET_MANGAS",
                payload: data,
            });
        };

        getMangas();
    }, [dispatch]);

    return (
        <motion.ul
            className="manga-list pagePadding--sideways mw--165 w-full"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        delay: 0.2,
                    },
                },
            }}
            initial="hidden"
            animate="show"
        >
            {loading ? (
                <div
                    className="grid place-items-center"
                    style={{
                        minHeight: 300,
                    }}
                >
                    <CircularProgress color="inherit" />
                </div>
            ) : (
                mangas.map((element) => (
                    <MangaContainer
                        key={element.id}
                        id={element.id}
                        name={element.name}
                        rating={element.rating}
                        img={element.img}
                    />
                ))
            )}
        </motion.ul>
    );
}

export default MangaList;