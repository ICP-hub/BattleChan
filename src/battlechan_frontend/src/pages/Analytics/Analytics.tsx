import React, { useEffect, useState } from "react";

import Navbar from "../../components/Dashboard/Navbar/Navbar";
import NavButtons from "../../components/Dashboard/NavButtons/NavButtons";

import trendingPost_coverImg from "../../images/trendingPost_coverImg.png";
import mybalance_Img from "../../images/my-balance-img.png";

import UserApiHanlder from "../../API_Handlers/user";
import CommentsApiHanlder from "../../API_Handlers/comments";
import TokensApiHanlder from "../../API_Handlers/tokens";
import { useConnect } from "@connect2ic/react";
import Constant from "../../utils/constants";
import toast from "react-hot-toast";

type Theme = {
  handleThemeSwitch: Function;
  type?: string;
};

interface UserAnalytics {
  likedPost: number;
  postData: number;
  comments: number;
  userArchivedPost: number;
  dislikedPost: number;
  status: boolean;
}

interface PostUpvoteData {
  postId: string;
  postMetaData: Int8Array;
  userName: string;
}

interface Response {
  upvotes: PostUpvoteData[];
  downvotes: PostUpvoteData[];
}

type RewardsData = {
  claimedStatus?: boolean;
  likes?: number;
  amount?: number;
  postId?: string;
  status?: boolean;
  error?: string;
};

interface ClaimResponse {
  ok: string;
  Ok: string;
  err: {
    [key: string]: string;
  };
  status?: boolean;
  msg?: string;
};

const Analytics = (props: Theme) => {
  const [likedPost, setLikedPost] = React.useState(0);
  const [dislikedPost, setDislikedPost] = React.useState(0);
  const [tokenBalance, setTokenBalance] = React.useState(0);

  const { getBalance, icrc1_transfer } = TokensApiHanlder();
  const { getRewardsOfUser, claimReward } = CommentsApiHanlder();
  const { getUserAnalytics } = UserApiHanlder();
  const { principal, isConnected } = useConnect();

  useEffect(() => {
    const fetchData = async () => {
      if (principal) {
        const data = await getBalance(principal || "");
        setTokenBalance(Number(data));
      }
    };

    fetchData();
  }, [principal]);

  useEffect(() => {
    async function getAnalytics() {
      try {
        const response = (await getUserAnalytics()) as UserAnalytics;
        setLikedPost(response?.likedPost);
        setDislikedPost(response?.dislikedPost);
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    }
    getAnalytics();
  }, []);

  const [voteData, setVoteData] = useState<Response | null>(null);
  const [rewardsData, setRewardsData] = useState<RewardsData[] | null>(null);
  const [principalId, setPrincipalId] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const adminPrincipal = "zha44-ywxln-mzci4-u5acw-jrncf-ijud7-t5w63-zfo4b-cypfc-giono-kqe";
  // const adminPrincipal = "bkvkj-i3f3r-pitry-pzsc3-i5pwi-6pp5q-cnask-xolcl-fxqke-wbf4d-gae";
  const { votesOfUser } = UserApiHanlder();
  const { convertInt8ToBase64 } = Constant();

  useEffect(() => {
    const getUserUpvotes = async () => {
      const res = (await votesOfUser()) as Response;
      setVoteData(res);
    };
    getUserUpvotes();
  }, []);

  const getRewards = async () => {
    const res = [(await getRewardsOfUser()) as RewardsData];
    const data = res.flat();
    if (data[0].status == true) {
      setRewardsData(data);
      console.log(rewardsData);
    }
  };

  useEffect(() => {
    getRewards();
  }, []);

  const [buttonDisabled, setButtonDisabled] = useState<boolean[]>(Array(rewardsData?.length || 0).fill(false));
  const [TransferbuttonDisabled, setTransferButtonDisabled] = useState(false);

  const handleClaimButtonClick = async (index: number, postId: string) => {
    // Temporarily disable the button
    const updatedButtonDisabled = [...buttonDisabled];
    updatedButtonDisabled[index] = true;
    setButtonDisabled(updatedButtonDisabled);

    const response = (await claimReward(postId)) as ClaimResponse;
    // Call the function to claim rewards here
    if (response && response?.status == true) {
      getRewards();
      toast.success("Successfully Claimed Reward!");
    } else {
      getRewards();
      toast.error(response?.msg || "Error: Something went wrong, Please try again later!");
    }

    updatedButtonDisabled[index] = false;
    setButtonDisabled(updatedButtonDisabled);
  };

  const handleTransferClick = async (amount: number, principal_id: string) => {
    setTransferButtonDisabled(true);
    if (amount == 0) {
      setTransferButtonDisabled(false);
      toast.error("Error: Invalid Amount Value!");
      return null;
    }
    if (principal_id == "") {
      setTransferButtonDisabled(false);
      toast.error("Error: Invalid Principal ID!");
      return null;
    }
    const response = await icrc1_transfer(principal_id, amount);

    if (response && response?.status == true) {
      setTransferButtonDisabled(false);
      toast.success("Successfully Transferred Tokens!");
    } else {
      getRewards();
      setTransferButtonDisabled(false);
      toast.error(response?.err || "Error: Something went wrong, Please try again later!");
    }
  };



  return (
    <>
      <div
        className={`min-h-lvh bg-[#ECECEC] dark:bg-dark dark:bg-green-gradient bg-top bg-contain bg-no-repeat relative`}
      >
        <NavButtons />

        <div className="dark:text-[#fff] px-6 tablet:px-10 gap-8 flex flex-col">
          <h1 className="font-bold text-center tablet:pt-12 pt-5 laptop:text-4xl phone:text-3xl text-2xl">
            Time Balance
          </h1>

          <div className="bg-green rounded-[10px] p-4 relative overflow-hidden">
            <div className="flex justify-between items-center text-[#fff]">
              <h2 className="font-bold tablet:text-3xl tablet:ml-11">
                Balance Check
              </h2>
              {/* <div className="flex items-center justify-center gap-2 z-10">
                <button className="border border-[#fff] dark:border-[#fff] text-[#fff] dark:text-[#fff] rounded-md phone:px-6 px-4 py-2 font-semibold text-xs tablet:text-base">
                  Today
                </button>
              </div> */}
            </div>
            <div className="bg-[#2A4B2F] rounded-[10px] flex gap-2 tablet:gap-7 items-center mt-6 p-3 text-[#fff]">
              <div className="bg-[#fff] rounded-md w-32 tablet:w-48">
                <img
                  className="block h-20 tablet:h-32 w-full object-cover"
                  src={mybalance_Img}
                  alt="myBalance img"
                />
              </div>
              <div>
                <h3 className="">My Balance</h3>
                <div className="font-bold text-xl tablet:text-3xl">
                  {tokenBalance}
                </div>
              </div>
            </div>
            <svg
              className="hidden tablet:block absolute w-[315.25px] h-[315.25px] right-0 top-[-44px]"
              viewBox="0 0 261 193"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.3024 65.1058L157.623 -43.382L306.944 65.1058L249.908 240.643H65.3378L8.3024 65.1058Z"
                stroke="url(#paint0_linear_1658_9871)"
              />
              <path
                d="M27.7473 71.9243L157.248 -22.1637L286.749 71.9243L237.284 224.162H77.2123L27.7473 71.9243Z"
                stroke="url(#paint1_linear_1658_9871)"
              />
              <path
                d="M50.0838 79.1845L157.243 1.32897L264.402 79.1845L223.471 205.157H91.0149L50.0838 79.1845Z"
                stroke="url(#paint2_linear_1658_9871)"
              />
              <path
                d="M70.2699 85.7411L157.249 22.5472L244.228 85.7411L211.005 187.991H103.493L70.2699 85.7411Z"
                stroke="url(#paint3_linear_1658_9871)"
              />
              <path
                d="M85.4178 90.163L157.622 37.7035L229.826 90.163L202.247 175.044H112.997L85.4178 90.163Z"
                stroke="url(#paint4_linear_1658_9871)"
              />
              <path
                d="M101.253 95.8105L157.241 55.1327L213.23 95.8105L191.844 161.629H122.639L101.253 95.8105Z"
                stroke="url(#paint5_linear_1658_9871)"
              />
              <path
                d="M115.686 99.9972L157.621 69.5301L199.555 99.9972L183.537 149.294H131.704L115.686 99.9972Z"
                stroke="url(#paint6_linear_1658_9871)"
              />
              <path
                d="M127.218 103.745L157.621 81.6556L188.024 103.745L176.411 139.485H138.831L127.218 103.745Z"
                stroke="url(#paint7_linear_1658_9871)"
              />
              <path
                d="M135.874 106.555L157.629 90.7494L179.383 106.555L171.074 132.129H144.184L135.874 106.555Z"
                stroke="url(#paint8_linear_1658_9871)"
              />
              <path
                d="M143.063 109.392L157.25 99.0848L171.437 109.392L166.018 126.07H148.482L143.063 109.392Z"
                stroke="url(#paint9_linear_1658_9871)"
              />
              <path
                d="M148.1 111.031L157.242 104.39L166.384 111.031L162.892 121.778H151.592L148.1 111.031Z"
                stroke="url(#paint10_linear_1658_9871)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1658_9871"
                  x1="246.796"
                  y1="-8.20512"
                  x2="157.623"
                  y2="271.246"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1658_9871"
                  x1="234.632"
                  y1="8.28065"
                  x2="157.248"
                  y2="250.785"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_1658_9871"
                  x1="221.336"
                  y1="26.4385"
                  x2="157.243"
                  y2="227.294"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_1658_9871"
                  x1="209.338"
                  y1="42.8382"
                  x2="157.249"
                  y2="206.075"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_1658_9871"
                  x1="200.923"
                  y1="54.4666"
                  x2="157.622"
                  y2="190.162"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint5_linear_1658_9871"
                  x1="190.896"
                  y1="68.0238"
                  x2="157.241"
                  y2="173.49"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint6_linear_1658_9871"
                  x1="182.915"
                  y1="79.0655"
                  x2="157.621"
                  y2="158.333"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint7_linear_1658_9871"
                  x1="176.056"
                  y1="88.4375"
                  x2="157.621"
                  y2="146.209"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint8_linear_1658_9871"
                  x1="170.919"
                  y1="95.4662"
                  x2="157.629"
                  y2="137.115"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint9_linear_1658_9871"
                  x1="166.039"
                  y1="101.995"
                  x2="157.25"
                  y2="129.537"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
                <linearGradient
                  id="paint10_linear_1658_9871"
                  x1="163.03"
                  y1="106.095"
                  x2="157.242"
                  y2="124.232"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#75A56D" />
                  <stop offset="1" stop-color="#18AF00" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center flex-wrap justify-center text-[#fff]">
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Upvote</div>
                <div className="font-bold text-xl mt-2">{likedPost}</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Downvote</div>
                <div className="font-bold text-xl mt-2">{dislikedPost}</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Buy</div>
                <div className="font-bold text-xl mt-2">0</div>
              </div>
            </div>
            <div className="p-2 w-1/2 tablet:w-1/4">
              <div className="bg-[url('/src/images/analytics-card-bg.jpg')] bg-cover bg-center text-center rounded-md p-2 tablet:p-11">
                <div>Earn From Others</div>
                <div className="font-bold text-xl mt-2">0</div>
              </div>
            </div>
          </div>

          <div className="pb-28">
            <h1 className="font-semibold text-lg text-center mb-8 tablet:text-2xl">
              Transaction Overview
            </h1>

            <div>

              {principal && isConnected && principal === adminPrincipal && (
                <div
                  key={1}
                  className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6"
                >
                  <div className="text-sm max-w-60 tablet:max-w-none items-center">
                    <div>
                      <input
                        type="text"
                        name="principal_id"
                        placeholder="Principal ID"
                        onChange={(e) => setPrincipalId(e.target.value)}
                        className="py-1 px-4 italic bg-light dark:bg-dark border border-light-green  rounded-lg"
                      />
                      <input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="ml-3 py-1 px-4 italic bg-light dark:bg-dark border border-light-green rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center pl-2">
                    <div className="w-24 h-10">
                      <button
                        type="button"
                        onClick={() => handleTransferClick(amount, principalId)}
                        disabled={TransferbuttonDisabled}
                        className={`bg-[#272727] dark:bg-[#c2c2c2] text-light dark:text-dark phone:text-base text-sm laptop:py-2 laptop:px-4 py-1 px-2 rounded-lg font-semibold`}
                      >
                        Transfer
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {rewardsData?.map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6"
                >
                  <div className="text-sm max-w-60 tablet:max-w-none items-center">
                    <div>
                      Claim Your Reward of
                      <strong> {data.amount}</strong> Tokens from post Id <strong>{data.postId}</strong>
                      <br />
                      <span className="opacity-75"><i>Comment Likes: {data.likes}</i></span>
                    </div>
                  </div>

                  <div className="flex items-center pl-2">
                    <div className="w-24 h-10">
                      <button
                        type="button"
                        className={`${data.claimedStatus ? 'disable' : ''
                          } ${data.claimedStatus ? 'bg-[#5f7d63]' : 'bg-[#272727] dark:bg-[#c2c2c2]'
                          } text-light dark:text-dark phone:text-base text-sm laptop:py-2 laptop:px-4 py-1 px-2 rounded-lg font-semibold`}
                        onClick={() => handleClaimButtonClick(index, data.postId || "")}
                        disabled={data.claimedStatus || buttonDisabled[index]}
                      >
                        {buttonDisabled[index] ? 'Claiming...' : data.claimedStatus ? 'Claimed' : 'Claim'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {voteData?.upvotes.map((vote, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6"
                >
                  <div className="text-sm max-w-60 tablet:max-w-none items-center">
                    <div>
                      <span className="text-[#18AF00]">
                        {"Upvote:"}
                      </span>{" "}
                      <strong>{vote.userName}</strong> with post Id {vote.postId}
                    </div>
                  </div>
                  <div className="flex items-center pl-2">
                    <div className={"text-red mr-2 tablet:mr-4"}>-1</div>
                    <div className="w-24 h-10">
                      <img
                        className="block h-full w-full rounded"
                        src={convertInt8ToBase64(vote.postMetaData)}
                        alt="post image"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {voteData?.downvotes.map((vote, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-green rounded-[10px] p-3 mt-6"
                >
                  <div className="text-sm max-w-60 tablet:max-w-none items-center">
                    <div>
                      <span className="text-red">
                        {"Downvote:"}
                      </span>{" "}
                      <strong>{vote.userName}</strong> with post Id {vote.postId}
                    </div>
                  </div>
                  <div className="flex items-center pl-2">
                    <div className={"text-red mr-2 tablet:mr-4"}>-1</div>
                    <div className="max-w-20 tablet:max-w-28 rounded-sm flex items-center">
                      <img
                        className="block h-auto w-full rounded"
                        src={convertInt8ToBase64(vote.postMetaData)}
                        alt="post image"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
