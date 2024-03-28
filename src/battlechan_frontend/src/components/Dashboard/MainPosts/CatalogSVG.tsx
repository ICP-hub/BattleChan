import React from "react";

interface CatalogSVGProps {
  label: string;
}

const CatalogSVG: React.FC<CatalogSVGProps> = ({ label }) => {
  const getSVGComponent = (label: string) => {
    switch (label.toLowerCase()) {
      case "business":
        return (
          <svg
            width="26"
            height="23"
            viewBox="0 0 26 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.8 23V19.0571H16.9V17.7429H20.8V13.8H22.1V17.7429H26V19.0571H22.1V23H20.8ZM1.599 19.7143V11.8286H0V10.5143L1.5002 3.94286H19.2998L20.8 10.5143V11.8286H19.201V16.1263H17.901V11.8286H11.999V19.7143H1.599ZM2.899 18.4H10.699V11.8286H2.899V18.4ZM1.5002 1.31429V0H19.2998V1.31429H1.5002ZM1.3156 10.5143H19.4844L18.2806 5.25714H2.5194L1.3156 10.5143Z"
              fill="currentColor"
            />
          </svg>
        );
      case "politics":
        return (
          <svg
            width="18"
            height="23"
            viewBox="0 0 18 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 11.5H17M2.45382 11.5L3.18232 22M15.5478 11.5L14.8193 22M13.7622 11.5344C13.7622 10.2323 13.2606 8.98348 12.3676 8.06276C11.4747 7.14203 10.2636 6.62477 9.00079 6.62477C7.73798 6.62477 6.52689 7.14203 5.63395 8.06276C4.74101 8.98348 4.23936 10.2323 4.23936 11.5344M9.00079 6.24836C9.34246 6.26081 9.68306 6.20217 10.0023 6.07594C10.3215 5.9497 10.6128 5.75847 10.8587 5.51364C11.1047 5.26881 11.3004 4.9754 11.434 4.65091C11.5676 4.32643 11.6365 3.97752 11.6365 3.625C11.6365 3.27248 11.5676 2.92357 11.434 2.59909C11.3004 2.2746 11.1047 1.98119 10.8587 1.73636C10.6128 1.49153 10.3215 1.3003 10.0023 1.17406C9.68306 1.04783 9.34246 0.989191 9.00079 1.00164C8.34158 1.02565 7.71715 1.31255 7.25903 1.80191C6.80092 2.29126 6.5449 2.94485 6.5449 3.625C6.5449 4.30515 6.80092 4.95874 7.25903 5.44809C7.71715 5.93745 8.34158 6.22435 9.00079 6.24836ZM9.00079 14.1365L9.93721 16.0921L12.0291 16.4063L10.5149 17.9283L10.872 20.0771L9.00079 19.0624L7.12796 20.0771L7.48666 17.9283L5.97252 16.4063L8.06438 16.0921L9.00079 14.1365Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "sports":
        return (
          <svg
            width="20"
            height="25"
            viewBox="0 0 20 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0288 11.2573C12.1271 11.3489 12.226 11.4357 12.3273 11.5164C13.1099 12.1443 13.9465 12.4142 14.743 12.4567C16.0837 12.5283 17.2764 11.9301 17.7612 11.6863L17.8977 11.6195C18.1887 11.4823 18.4133 11.235 18.5221 10.9322C18.6309 10.6293 18.6149 10.2956 18.4776 10.0046C18.3404 9.71352 18.0931 9.4889 17.7903 9.38014C17.4874 9.27137 17.1537 9.28737 16.8627 9.42462L16.6601 9.52168C16.1238 9.78073 15.5274 10.0683 14.8722 10.0337C14.5537 10.0161 14.2104 9.91601 13.8458 9.6236C13.4666 9.31906 13.0134 8.76518 12.5754 7.75994C12.2205 6.9458 11.6915 6.31487 10.9405 5.95634C10.221 5.61297 9.45536 5.59841 8.77286 5.6797C6.94378 5.89689 5.55392 6.95733 4.60874 7.94255C3.8304 8.75304 3.24982 9.6327 2.96469 10.064C2.90706 10.152 2.86156 10.2212 2.8288 10.2673C2.649 10.5305 2.58002 10.8539 2.63677 11.1676C2.69352 11.4813 2.87144 11.7601 3.13207 11.9436C3.3927 12.1272 3.71509 12.2008 4.02956 12.1485C4.34403 12.0963 4.62531 11.9224 4.81258 11.6644C4.88053 11.5686 4.95515 11.4563 5.03826 11.3307C5.34159 10.8751 5.75715 10.2497 6.35957 9.62239C6.83398 9.12796 7.36541 8.70027 7.95023 8.41938L7.50555 9.64605C7.05662 10.8873 6.55734 12.279 6.47665 12.558C6.42279 12.7467 6.41119 12.9449 6.44268 13.1386C6.46149 13.2611 6.49425 13.3649 6.52033 13.4377C6.5719 13.5821 6.64045 13.7192 6.70112 13.8296C6.82488 14.0577 6.99474 14.3204 7.17735 14.5867C7.54741 15.1272 8.04608 15.7915 8.54051 16.4346C8.97731 17.0018 9.42199 17.5666 9.78781 18.0313L9.93401 18.2176C10.1306 18.4669 10.295 18.6762 10.4157 18.8333C10.4703 18.9037 10.5067 18.9534 10.531 18.985C10.5546 19.0657 10.5844 19.1828 10.6201 19.3362C10.6911 19.6414 10.7724 20.0382 10.8586 20.4743C10.9144 20.7546 10.972 21.0537 11.0284 21.3491C11.1437 21.9455 11.2559 22.5279 11.3421 22.9174C11.3765 23.073 11.4412 23.2202 11.5326 23.3508C11.6239 23.4814 11.7401 23.5927 11.8744 23.6784C12.0088 23.7641 12.1587 23.8225 12.3156 23.8502C12.4725 23.8779 12.6334 23.8745 12.789 23.8401C12.9446 23.8057 13.0918 23.741 13.2224 23.6496C13.353 23.5583 13.4643 23.4421 13.55 23.3078C13.6357 23.1734 13.694 23.0235 13.7218 22.8666C13.7495 22.7096 13.7461 22.5488 13.7117 22.3932C13.6328 22.0353 13.5315 21.5135 13.4217 20.9421C13.3629 20.6375 13.3016 20.319 13.2397 20.0042C13.1608 19.597 13.0754 19.1911 12.9837 18.7866C12.9471 18.6258 12.9063 18.466 12.8612 18.3073C12.8308 18.2054 12.7689 17.9931 12.6634 17.8081C12.5654 17.653 12.4589 17.5036 12.3443 17.3603L12.3382 17.3531C12.2084 17.1838 12.0361 16.9648 11.8407 16.7167L11.6933 16.5292C11.2331 15.9462 10.7764 15.3604 10.3235 14.7717L12.0288 11.2573ZM7.7379 18.6089L6.00588 16.2022L5.50842 17.6333L2.49089 16.9242C2.17763 16.8506 1.84795 16.9044 1.57439 17.0739C1.30082 17.2433 1.10578 17.5145 1.03217 17.8278C0.958565 18.141 1.01241 18.4707 1.18188 18.7443C1.35134 19.0178 1.62253 19.2129 1.9358 19.2865L6.01741 20.2456C6.30942 20.3142 6.61646 20.2721 6.87929 20.1276C7.14211 19.9831 7.34209 19.7463 7.44064 19.463L7.7379 18.6089Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.2969 3C17.2969 4.65685 15.9537 6 14.2969 6C12.64 6 11.2969 4.65685 11.2969 3C11.2969 1.34315 12.64 0 14.2969 0C15.9537 0 17.2969 1.34315 17.2969 3ZM12.0817 3C12.0817 4.22342 13.0735 5.21519 14.2969 5.21519C15.5203 5.21519 16.5121 4.22342 16.5121 3C16.5121 1.77658 15.5203 0.784808 14.2969 0.784808C13.0735 0.784808 12.0817 1.77658 12.0817 3Z"
              fill="currentColor"
            />
          </svg>
        );
      case "games":
        return (
          <svg
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.02367 16C1.34686 16 0.822817 15.7551 0.451547 15.2653C0.0793889 14.7764 -0.062724 14.2298 0.0252084 13.6253L1.47476 3.472C1.62309 2.46578 2.0632 1.63556 2.79508 0.981333C3.52696 0.327111 4.39696 0 5.40507 0H18.5949C19.603 0 20.473 0.327111 21.2049 0.981333C21.9368 1.63556 22.3769 2.46578 22.5252 3.472L23.9748 13.6253C24.0627 14.2298 23.9206 14.7764 23.5485 15.2653C23.1772 15.7551 22.6531 16 21.9763 16C21.6814 16 21.415 15.9551 21.1769 15.8653C20.9398 15.7764 20.7146 15.6249 20.5015 15.4107L17.0934 12H6.90658L3.49854 15.4107C3.28537 15.624 3.06021 15.7756 2.82306 15.8653C2.58502 15.9551 2.31856 16 2.02367 16ZM2.5566 14.4667L6.35368 10.6667H17.6463L21.4434 14.4667C21.4878 14.5111 21.6486 14.5778 21.9257 14.6667C22.17 14.6667 22.3645 14.5947 22.5093 14.4507C22.654 14.3067 22.7038 14.112 22.6585 13.8667L21.1849 3.6C21.0952 2.95556 20.8035 2.41689 20.3096 1.984C19.8149 1.55022 19.2433 1.33333 18.5949 1.33333H5.40507C4.75668 1.33333 4.18512 1.55022 3.69039 1.984C3.19655 2.41689 2.90477 2.95556 2.81506 3.6L1.34153 13.8667C1.29712 14.1111 1.3473 14.3058 1.49208 14.4507C1.63686 14.5956 1.83093 14.6676 2.0743 14.6667C2.15246 14.6667 2.31323 14.6 2.5566 14.4667ZM18.6615 9.07733C18.9538 9.07733 19.206 8.97067 19.4183 8.75733C19.6315 8.544 19.7381 8.29156 19.7381 8C19.7381 7.70756 19.6315 7.45511 19.4183 7.24267C19.2051 7.02933 18.9529 6.92267 18.6615 6.92267C18.3693 6.92267 18.1171 7.02933 17.9048 7.24267C17.6916 7.456 17.585 7.70844 17.585 8C17.585 8.29244 17.6916 8.54489 17.9048 8.75733C18.118 8.97067 18.3702 9.07733 18.6615 9.07733ZM15.9969 5.07733C16.2891 5.07733 16.5414 4.97067 16.7537 4.75733C16.9668 4.544 17.0734 4.29156 17.0734 4C17.0734 3.70756 16.9668 3.45511 16.7537 3.24267C16.5405 3.02933 16.2883 2.92267 15.9969 2.92267C15.7047 2.92267 15.4525 3.02933 15.2402 3.24267C15.027 3.456 14.9204 3.70844 14.9204 4C14.9204 4.29244 15.027 4.54489 15.2402 4.75733C15.4533 4.97067 15.7056 5.07733 15.9969 5.07733ZM6.74804 6.58933V8.33333C6.74804 8.504 6.80355 8.64489 6.91458 8.756C7.0256 8.86711 7.16594 8.92267 7.33559 8.92267C7.50523 8.92267 7.64601 8.86711 7.75793 8.756C7.86984 8.64489 7.9258 8.504 7.9258 8.33333V6.58933H9.66846C9.83899 6.58933 9.97978 6.53378 10.0908 6.42267C10.2018 6.31156 10.2573 6.17111 10.2573 6.00133C10.2573 5.83156 10.2018 5.69067 10.0908 5.57867C9.97978 5.46667 9.83899 5.41067 9.66846 5.41067H7.9258V3.66667C7.9258 3.496 7.87029 3.35511 7.75926 3.244C7.64824 3.13289 7.5079 3.07733 7.33825 3.07733C7.1686 3.07733 7.02782 3.13289 6.91591 3.244C6.804 3.35511 6.74804 3.496 6.74804 3.66667V5.41067H5.00538C4.83484 5.41067 4.69406 5.46622 4.58304 5.57733C4.47201 5.68844 4.4165 5.82889 4.4165 5.99867C4.4165 6.16844 4.47201 6.30933 4.58304 6.42133C4.69406 6.53333 4.83484 6.58933 5.00538 6.58933H6.74804Z"
              fill="currentColor"
            />
          </svg>
        );
      case "technology":
        return (
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1486 12.5259C12.5532 13.2047 11.8281 13.76 11.0121 14.1627V16.4766C11.0121 16.6812 10.9308 16.8774 10.7862 17.022C10.6415 17.1667 10.4453 17.2479 10.2408 17.2479H5.61289C5.40832 17.2479 5.21214 17.1667 5.06749 17.022C4.92284 16.8774 4.84157 16.6812 4.84157 16.4766V14.1627C3.21618 13.3514 1.97358 11.9352 1.38045 10.2181C0.787308 8.50106 0.890895 6.6199 1.66898 4.97834C2.44706 3.33677 3.83763 2.06562 5.54228 1.43768C7.24693 0.80973 9.12981 0.875026 10.7869 1.61955M4.84157 21.0567H11.0121"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.5892 6.29951C11.0477 6.20541 11.0477 5.42793 11.5892 5.33383C12.5479 5.16697 13.4352 4.71839 14.138 4.04528C14.8408 3.37217 15.3272 2.50502 15.5352 1.55439L15.5676 1.40321C15.6849 0.867918 16.4469 0.864832 16.5688 1.39858L16.6089 1.5729C16.825 2.51923 17.3158 3.38063 18.0198 4.04893C18.7237 4.71723 19.6095 5.16263 20.5658 5.3292C21.1103 5.42484 21.1103 6.20541 20.5658 6.30106C19.6098 6.4679 18.7244 6.91342 18.0207 7.5817C17.317 8.24998 16.8264 9.11124 16.6105 10.0574L16.5704 10.2317C16.4485 10.7654 15.6864 10.7623 15.5692 10.227L15.5383 10.0774C15.3301 9.12636 14.8432 8.25891 14.1398 7.58575C13.4365 6.9126 12.5485 6.46581 11.5892 6.29951Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      case "crypto":
        return (
          <svg
            width="28"
            height="25"
            viewBox="0 0 28 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.26164 5.21305L13.9129 0.287677L22.5642 5.21305L13.9129 10.1384L5.26164 5.21305Z"
              stroke="currentColor"
              stroke-width="0.5"
            />
            <path
              d="M22.5936 6.48732L22.5334 16.4422L13.9423 21.4718L14.0024 11.5169L22.5936 6.48732Z"
              stroke="currentColor"
              stroke-width="0.5"
            />
            <path
              d="M4.76728 6.48732L4.82742 16.4422L13.4186 21.4718L13.3584 11.5169L4.76728 6.48732Z"
              stroke="currentColor"
              stroke-width="0.5"
            />
          </svg>
        );

      case "cinema":
        return (
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.53418 7.30859H18.0891V16.337C18.0891 16.7857 17.9109 17.216 17.5936 17.5333C17.2763 17.8506 16.846 18.0288 16.3973 18.0288H3.22597C2.77728 18.0288 2.34697 17.8506 2.02969 17.5333C1.71242 17.216 1.53418 16.7857 1.53418 16.337V7.30859Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.3296 12.4778L8.74603 10.2294C8.71189 10.208 8.67262 10.196 8.6323 10.1949C8.59198 10.1937 8.55209 10.2034 8.5168 10.223C8.48151 10.2425 8.4521 10.2712 8.43166 10.3059C8.41121 10.3407 8.40047 10.3803 8.40056 10.4207V14.9173C8.40047 14.9577 8.41121 14.9973 8.43166 15.0321C8.4521 15.0668 8.48151 15.0955 8.5168 15.115C8.55209 15.1345 8.59198 15.1442 8.6323 15.1431C8.67262 15.142 8.71189 15.13 8.74603 15.1085L12.3296 12.8602C12.3619 12.8399 12.3886 12.8117 12.4071 12.7782C12.4256 12.7448 12.4353 12.7072 12.4353 12.669C12.4353 12.6308 12.4256 12.5932 12.4071 12.5598C12.3886 12.5263 12.3619 12.4981 12.3296 12.4778ZM15.7894 1.16497L15.3017 3.13573L12.8885 3.57958L13.3762 1.60882L10.8604 2.0716L10.3722 4.04283L7.95902 4.48667L8.4472 2.51591L5.93099 2.9787L5.44326 4.94946L3.03004 5.39377L3.51777 3.42301L1.46202 3.80127C1.38915 3.81461 1.31962 3.84219 1.25741 3.88243C1.19521 3.92267 1.14155 3.97478 1.09951 4.03579C1.05747 4.09679 1.02787 4.16548 1.01241 4.23794C0.996946 4.31039 0.995924 4.38519 1.0094 4.45804L1.53408 7.3091L17.8156 4.31301L17.2909 1.46195C17.2775 1.3891 17.2499 1.3196 17.2096 1.25743C17.1694 1.19526 17.1173 1.14162 17.0563 1.09959C16.9953 1.05756 16.9266 1.02795 16.8542 1.01247C16.7818 0.996978 16.707 0.995911 16.6341 1.00933L15.7894 1.16497Z"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return <>{getSVGComponent(label)}</>;
};

export default CatalogSVG;