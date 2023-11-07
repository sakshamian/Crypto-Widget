const CoinGeckoTokenWidget = {
    init: async function (tokenName, containerId) {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenName}`);
        const data = await res.json();
        console.log('res', data);
        if(res){
            displayDetails(data, containerId);
        } else {
            console.log(res.error);
        }
    }
};

function formatNum(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      return (number / 1000).toFixed(2) + ' K';
    } else if (number < 1000000000) {
      return (number / 1000000).toFixed(2) + ' M';
    } else {
      return (number / 1000000000).toFixed(2) + ' B';
    }
}

const displayDetails = (tokenData, containerId) => {
    const container = document.getElementById(containerId);
  
      if (!container) {
        console.error('Container not found');
        return;
      }

      const html = `
        <div style="
            border:2px solid #e1e5ea;
            border-radius: 10px;
            font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
            min-width:285px;
        ">
            <div style="
                display:flex;
                padding:12px 0px;"
            >
                <div style="width:33%;display: flex;justify-content: center;align-items: center;">
                    <img style="width:46px;height:46px;" src="${tokenData?.image?.small}">
                </div>
                <div style="width:67%;border: none;text-align:left;line-height:1.4">
                    <span style="font-size: 18px;">
                        <a href="${tokenData?.links?.homepage?.[0]}" target="_blank" style="text-decoration: none; color: rgb(16, 112, 224);">
                            ${tokenData?.name} (${tokenData?.symbol?.toUpperCase()})
                        </a>
                    </span> 
                    <br>
                    <span style="font-size: 16px;">                
                        <span style="font-size: 20px; font-weight: 400;">
                            ${formatNum(tokenData?.market_data.current_price?.usd)}
                        </span>
                        <span style="font-size: 14px; font-weight: 500;">
                            USD
                        </span> 
                        <span style="margin-left:6px; font-weight: 500;">
                            <span style="color:#d94040">
                            (${parseFloat(tokenData?.market_data?.price_change_percentage_24h_in_currency?.usd).toFixed(2)}%)
                            </span>
                        </span>          
                    </span>
                </div>
            </div>
            <div style="
                border-top: 1px solid #e1e5ea;
                clear:both;
            ">
                <div style="
                    text-align:center;
                    float:left;
                    width:33%;
                    font-size:12px;
                    padding:12px 0;
                    border-right:1px solid #e1e5ea;
                    line-height:1em;
                ">
                    RANK                      
                    <br>
                    <br>
                    <span style="font-size: 18px; ">${tokenData?.market_cap_rank}</span>
                </div>
                <div style="text-align:center;float:left;width:33%;font-size:12px;padding:12px 0 16px 0;border-right:1px solid #e1e5ea;line-height:1em;">
                    MARKET CAP                      
                    <br>
                    <br>
                    <span style="font-size: 16px; ">
                        $${formatNum(tokenData?.market_data?.market_cap?.usd)} 
                    <span style="font-size:12px">USD</span></span>
                </div>
                <div style="text-align:center;float:left;width:33%;font-size:12px;padding:12px 0 16px 0;line-height:1em;">
                    VOLUME                      
                    <br><br>                      
                    <span style="font-size: 16px; ">
                        $${formatNum(tokenData?.market_data?.total_volume?.usd)}
                    <span style="font-size:12px">USD</span></span>                  
                </div>    
            </div>  
            <div style="border-top: 1px solid #e1e5ea;text-align:center;clear:both;font-size:12px;font-style:italic;padding:8px 0;">      
                <a href="https://www.plena.finance/" target="_blank" style="text-decoration: none; color: rgb(16, 112, 224);">
                    Powered by Plena Finance
                </a>  
            </div>
        </div>
      `;
      // <img src="${tokenImage}" alt="" />
            // <h2>${tokenName} (${tokenSymbol})</h2>
            // <p>Price: $${tokenPriceUSD}</p>
      container.innerHTML = html;
}