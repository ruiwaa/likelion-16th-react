import { useNavigate, useParams } from "react-router-dom";
import S from "./style.module.css";
import { useMovies } from "@/contexts";
import { useEffect } from "react";

export default function MovieDetail() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  const navigate = useNavigate();

  // 영화 찾기
  const movie = movies.find((movie) => movie.id === movieId);
  const handleGoBack = () => navigate(-1);

  // 없는 영화일 경우
  // 이펙트 사용해 렌더링 이후에 404 페이지 이동
  useEffect(() => {
    if (!movie) navigate("/not-found-movie");
  }, [movie, navigate]);

  return (
    <div className={S.container}>
      <button type="button" aria-label="뒤로 가기" onClick={handleGoBack}>
        ← Back
      </button>

      <h1>영화 정보</h1>
      {!movie ? (
        <p>영화 정보 없음</p>
      ) : (
        <>
          <ul>
            <li>ID: {movie?.id}</li>
            <li>
              {movie?.title} ({movie?.year})
            </li>
          </ul>
          <p>상세 정보를 불러오는 중...</p>
        </>
      )}
    </div>
  );
}
