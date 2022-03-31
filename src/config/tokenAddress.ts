// export const flareAddress = "0x390c9C29cDC0919719A6816eBF8a2b11E3688813"; // FLARE
// export const usdcAddress = "0xa3D1b34AF7261AF1cca5088D2dd15820609Ebc4E"; // USDC
// export const presaleAddress = "0x49146CcD7E6767c300Ce923321A80f66d9AC2247"; // Presale

export const getTokenAddress = (chainId: string) => {
  let usdcAddress = "";
  let presaleAddress = "";
  switch (chainId) {
    case "0x3":
      usdcAddress = "0xa3D1b34AF7261AF1cca5088D2dd15820609Ebc4E";
      presaleAddress = "0x49146CcD7E6767c300Ce923321A80f66d9AC2247";
      break;
  }
  return {
    usdcAddress,
    presaleAddress
  };
}