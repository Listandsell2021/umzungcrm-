export default function handler(req, res) {
    if (req.method === 'POST') {
    
        postdata()
     
     
      res.status(200).json({ status: req.body })
      
    } else {
      // Handle any other HTTP method
    }
  }
  function postdata()
  {
    fetch("https://dashboard-lieferservice.vedis.berlin/wp-json/wc/v3/orders?consumer_key=ck_82c69d8691908c5dabbbf237555148961208ad71&consumer_secret=cs_30a42538f3ecc9a73b644b26df866eee8964160b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      });
  }