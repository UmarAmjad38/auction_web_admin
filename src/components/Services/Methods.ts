import { getRequest, getRequestOld, putRequest, postWithFormRequest, postRequest } from './index';

export const SignInUser = (payload: LogInPayload) => getRequest(`/users/login?username=${payload.email}&password=${payload?.password}`)
export const forgotPassword = (email: any) => putRequest(`/clients/forgotpassword?email=${email}`)
export const verifyOtp = (payload: any) => postRequest('/clients/verifyotp', payload);
export const updatePassword = (payload: any) => putRequest('/clients/updatepassword', payload);
export const changePassword = (payload: any) => putRequest('/clients/changepassword', payload);


// Dashboard Methods
export const getDashboardStatistics = () => getRequest('/users/dashboard');

// Auction Methods
export const createAuction = (payload: FormData) => postWithFormRequest('/auctions/create', payload);
export const getCurrentAuctions = () => getRequest('/auctions/currentauctions');
export const getPastAuctions = () => getRequest('/auctions/pastauctions');
export const editAuction = (payload: any) => postWithFormRequest('/auctions/update', payload);
export const deleteAuction = (id: any) => getRequest(`/auctions/delete?id=${id}`);
export const getAuctionDetailById = (id: any) => getRequest(`/lots/auctiondetailbyid?id=${id}`);
export const setFeaturedAuctions = (id: any) => getRequest(`/auctions/featured?id=${id}`)


// Lot Methods
export const createLot = (payload: any) => postWithFormRequest('/lots/create', payload);
export const editLot = (payload: any) => postRequest('/lots/editlot', payload);
export const editLotImage = (id: any, payload: any) => postWithFormRequest(`/lots/editcover?id=${id}`, payload);
export const getCurrentLots = () => getRequest('/lots/currentlots');
export const getPastLots = () => getRequest('/lots/pastlots');
export const getLotsByAuctionId = (id: any) => getRequest(`/lots/lotsbyauctionid?id=${id}`);
export const getLotDetailsById = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const getWinnerByLotId = (id: any) => getRequest(`/lots/lotwinner?id=${id}`);
export const deleteLot = (id: any) => getRequest(`/lots/delete?id=${id}`);
export const getLotDetails = (id: any) => getRequest(`/lots/lotdetails?id=${id}`);
export const moveLotToAuction = (lotId: any, newAuctionId: any) => putRequest(`/lots/movelot?id=${lotId}&newauctionid=${newAuctionId}`);
export const getLotWinner = (id: any) => getRequest(`/lots/lotwinner?id=${id}`);
export const getBiddersByLotId = (id: any) => getRequest(`/lots/livebiddersbylot?id=${id}`);
export const getFeaturedLots = () => getRequest('/lots/featuredlisting')
export const setFeaturedLots = (id: any) => getRequest(`/lots/featured?id=${id}`)


// Bidding Methods
export const placeBid = (payload: any) => postWithFormRequest('/lots/newbid', payload);


// Payment Tracking Methods
export const getPendingInvoices = () => getRequest('/invoices/pending');
export const getPaidInvoices = () => getRequest('/invoices/paid');
export const invoiceReminder = (payload: any) => postRequest('/invoices/invoicereminder', payload);

// Location Methods
export const getCurrentLocations = () => getRequest('/auctions/currentlocations');
export const getPastLocations = () => getRequest('/auctions/pastlocations');
export const getAllLocations = () => getRequest(`/auctions/alllocations`);

export const getCountries = () => getRequest('/locations/getcountries');
export const getStatesByCountry = (id: any) => getRequest(`/locations/getstatesbycountry?id=${id}`);
export const getCitiesByState = (state: any) => getRequest(`/locations/getcitiesbystate?id=${state}`);
export const getAddressByCity = (city: any) => getRequest(`/auctions/getaddressbycity?id=${city}`);

// Live Streaming Methods
export const getCurrentLiveAuctions = () => getRequest('/auctions/currentliveauctions');
export const createStream = (payload: any) => postRequest('/stream/create', payload);
export const getStream = (payload: any) => getRequest('/stream/streaminfo');
export const getStreamByLotId = (id: any) => getRequest(`/stream/streaminfobylotid?id=${id}`);



export const goLive = ({ payload, token, body }: any) => getRequest(`/stream/go-live/${payload}?authorizationToken=${token}`, body);
export const getAuthToken = () => postRequest(`/auth/token`);


// https://auction.sttoro.com/api/auth/token
// Inventory methods /lots/lotinventory
export const getInventoryLots = () => getRequest('/lots/lotinventory');
