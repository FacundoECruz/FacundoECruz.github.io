import { useEffect, useState } from "react";
import api from "../../utils/api-client";

function useAchievements() {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    api
      .getAchievements()
      .then(res => {
        setAchievements(res.data)
      })
  }, []);


  return { achievements };
}

export default useAchievements;