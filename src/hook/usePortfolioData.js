import { useEffect, useState } from "react";
import axios from "axios";

const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const portfolioAPI = async () => {
    try {
      const response = await axios.get(
        "https://portfolio-backend-8-lw86.onrender.com/api/portfolio"
      );
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    portfolioAPI();
  }, []);

  return { data, loading, error, portfolioAPI };
};

export default usePortfolioData;
