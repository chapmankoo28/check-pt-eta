#!/usr/bin/env python3


def csv_to_dataframe(csv_content):
    from io import StringIO
    import pandas as pd

    if isinstance(csv_content, bytes):
        csv_content = csv_content.decode("utf-8")

    csv_file = StringIO(csv_content)

    df = pd.read_csv(csv_file, encoding="utf-8")
    df.columns = df.columns.str.strip()  # Trim whitespace

    return df


def dataframe_to_json(df):
    # add the chinese name into the json for easy reference
    additional_info = {
        "AEL": {"Chinese Name": "機場快綫"},
        "DRL": {"Chinese Name": "迪士尼綫"},
        "EAL": {"Chinese Name": "東鐵綫"},
        "ISL": {"Chinese Name": "港島綫"},
        "KTL": {"Chinese Name": "觀塘綫"},
        "SIL": {"Chinese Name": "南港島綫"},
        "TCL": {"Chinese Name": "東涌綫"},
        "TKL": {"Chinese Name": "將軍澳綫"},
        "TML": {"Chinese Name": "屯馬綫"},
        "TWL": {"Chinese Name": "荃灣綫"},
    }
    result = {}
    for (line_code, direction), group in df.groupby(["Line Code", "Direction"]):
        if line_code not in result:
            result[line_code] = {}
        result[line_code][direction] = group.to_dict("records")
        if line_code in additional_info:
            result[line_code]["Chinese Name"] = additional_info[line_code][
                "Chinese Name"
            ]
    json_list = [
        {"Line Code": line_code, **directions}
        for line_code, directions in result.items()
    ]
    return json_list


def main():
    from merger_bus_routes import save_json, fetch_data, timestamp

    print(f"\nStart formatting MTR line and station...\n")

    url = "https://opendata.mtr.com.hk/data/mtr_lines_and_stations.csv"

    line_station_csv = fetch_data(url, False)

    df = csv_to_dataframe(line_station_csv)
    line_station = dataframe_to_json(df)

    json_timestamp = {"timestamp": timestamp(), "data": line_station}

    save_json(json_timestamp, "mtr_lines_and_stations.json")

    print(f"\nDone!\n")


if __name__ == "__main__":
    main()
