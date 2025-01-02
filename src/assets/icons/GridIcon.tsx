import React from "react";
import { useGlobalContext } from "../../components/contexts/GlobalContex";

interface Props {
  single?: boolean;
  double?: boolean;
  multi?: boolean;
}

const GridIcon: React.FC<Props> = ({ single, double, multi }) => {
  const { colors } = useGlobalContext();

  return (
    <>
      {single ? (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18.9169" height="18.9169" rx="2" fill={colors.black} />
        </svg>
      ) : double ? (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_358_191)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.58333 0C0.708882 0 0 0.708883 0 1.58333V6.55086C0 7.42531 0.708883 8.13419 1.58333 8.13419H6.55086C7.42531 8.13419 8.13419 7.42531 8.13419 6.55086V1.58333C8.13419 0.708882 7.42531 0 6.55086 0H1.58333ZM12.3882 0C11.5138 0 10.8049 0.708883 10.8049 1.58333V6.55086C10.8049 7.42531 11.5138 8.13419 12.3882 8.13419H17.3557C18.2302 8.13419 18.9391 7.42531 18.9391 6.55086V1.58333C18.9391 0.708882 18.2302 0 17.3557 0H12.3882ZM0 12.3882C0 11.5137 0.708882 10.8048 1.58333 10.8048H6.55086C7.42531 10.8048 8.13419 11.5137 8.13419 12.3882V17.3557C8.13419 18.2302 7.42531 18.939 6.55086 18.939H1.58333C0.708883 18.939 0 18.2302 0 17.3557V12.3882ZM12.3881 10.8048C11.5137 10.8048 10.8048 11.5137 10.8048 12.3882V17.3557C10.8048 18.2302 11.5137 18.939 12.3881 18.939H17.3557C18.2301 18.939 18.939 18.2302 18.939 17.3557V12.3882C18.939 11.5137 18.2301 10.8048 17.3557 10.8048H12.3881Z"
              fill={colors.black}
            />
          </g>
        </svg>
      ) : multi ? (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_358_170)">
            <path
              d="M0 0.999999C0 0.447714 0.447715 0 1 0H4.13738C4.68967 0 5.13738 0.447715 5.13738 1V4.13738C5.13738 4.68967 4.68967 5.13738 4.13738 5.13738H0.999999C0.447714 5.13738 0 4.68967 0 4.13738V0.999999Z"
              fill={colors.black}
            />
            <path
              d="M6.82414 0.999999C6.82414 0.447714 7.27186 0 7.82414 0H10.9615C11.5138 0 11.9615 0.447715 11.9615 1V4.13738C11.9615 4.68967 11.5138 5.13738 10.9615 5.13738H7.82414C7.27185 5.13738 6.82414 4.68967 6.82414 4.13738V0.999999Z"
              fill={colors.black}
            />
            <path
              d="M13.6483 0.999999C13.6483 0.447714 14.096 0 14.6483 0H17.7857C18.3379 0 18.7857 0.447715 18.7857 1V4.13738C18.7857 4.68967 18.3379 5.13738 17.7857 5.13738H14.6483C14.096 5.13738 13.6483 4.68967 13.6483 4.13738V0.999999Z"
              fill={colors.black}
            />
            <path
              d="M0 7.82411C0 7.27183 0.447715 6.82411 1 6.82411H4.13738C4.68967 6.82411 5.13738 7.27183 5.13738 7.82411V10.9615C5.13738 11.5138 4.68967 11.9615 4.13738 11.9615H0.999999C0.447714 11.9615 0 11.5138 0 10.9615V7.82411Z"
              fill={colors.black}
            />
            <path
              d="M6.82411 7.82411C6.82411 7.27183 7.27183 6.82411 7.82411 6.82411H10.9615C11.5138 6.82411 11.9615 7.27183 11.9615 7.82411V10.9615C11.9615 11.5138 11.5138 11.9615 10.9615 11.9615H7.82411C7.27183 11.9615 6.82411 11.5138 6.82411 10.9615V7.82411Z"
              fill={colors.black}
            />
            <path
              d="M13.6482 7.82411C13.6482 7.27183 14.0959 6.82411 14.6482 6.82411H17.7856C18.3379 6.82411 18.7856 7.27183 18.7856 7.82411V10.9615C18.7856 11.5138 18.3379 11.9615 17.7856 11.9615H14.6482C14.0959 11.9615 13.6482 11.5138 13.6482 10.9615V7.82411Z"
              fill={colors.black}
            />
            <path
              d="M0 14.6482C0 14.0959 0.447715 13.6482 1 13.6482H4.13738C4.68967 13.6482 5.13738 14.0959 5.13738 14.6482V17.7856C5.13738 18.3379 4.68967 18.7856 4.13738 18.7856H0.999999C0.447714 18.7856 0 18.3379 0 17.7856V14.6482Z"
              fill={colors.black}
            />
            <path
              d="M6.82411 14.6482C6.82411 14.0959 7.27183 13.6482 7.82411 13.6482H10.9615C11.5138 13.6482 11.9615 14.0959 11.9615 14.6482V17.7856C11.9615 18.3379 11.5138 18.7856 10.9615 18.7856H7.82411C7.27183 18.7856 6.82411 18.3379 6.82411 17.7856V14.6482Z"
              fill={colors.black}
            />
            <path
              d="M13.6482 14.6482C13.6482 14.0959 14.0959 13.6482 14.6482 13.6482H17.7856C18.3379 13.6482 18.7856 14.0959 18.7856 14.6482V17.7856C18.7856 18.3379 18.3379 18.7856 17.7856 18.7856H14.6482C14.0959 18.7856 13.6482 18.3379 13.6482 17.7856V14.6482Z"
              fill={colors.black}
            />
          </g>
        </svg>
      ) : (
        ""
      )}
    </>
  );
};

export default GridIcon;