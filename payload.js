function postZaikioOrderRequestParams(quantity, orderNumber) {
  return {
    order: {
      "state": "draft",
      "references": ["PWGRVN"],
      "currency": "EUR",
      "net_total": 3719848,
      "gross_total": 4438794,
      "taxes": 718946,
      "confirmed_at": null,
      "canceled_at": null,
      "fulfilled_at": null,
      "line_items": [
        {
          "references": ["OLI/BEEK96", "OLI/KTWEDZ"],
          "kind": "product",
          "job_id": "03a99788-e62c-4fe9-87b7-cda05af0633a",
          "quantity": quantity,
          "unit": "minute",
          "description": null,
          "net_price": 328,
          "net_total_price": 2502312,
          "gross_price": 390,
          "gross_total_price": 2977751,
          "order_number": orderNumber,
          "taxes": 475439,
          "tax_rate": "0.19",
          "shipping_option_id": null
        }
      ],
      "payment_terms": {
        "means_of_payment": "google_pay",
        "means_of_payment_hint": "GB24KOCX05855451134860",
        "mode": "collecting",
        "cash_discount": null,
        "cash_discount_timeframe": null,
        "due_at": null,
        "paid_at": null,
      },
      "address": {
        "kind": "shipping",
        "addressee": "Poseidon GmbH",
        "street": "Emmerich-Josef-Straße 1A",
        "number": null,
        "zip_code": "55116",
        "town": "Mainz",
        "country_code": "DE",
        "state": null,
      },
      "customer": {
        "name": "Koepp, Runte and Walker",
        "text_identifier": "Koepp, Runte and Walker",
        "references": ["CU/XEXDMG", "CU/z70rqr2"],
      },
      "contacts": [
        {
          "display_name": "Luigi Parisian 1",
          "role": "consultant",
          "email": "cleveland.corwin@dubuque.test",
          "phone": "+975 1-237-169-8095",
        }
      ],
      "links": [],
      "shipping_options": []
    }
  }
}

module.exports = postZaikioOrderRequestParams;
