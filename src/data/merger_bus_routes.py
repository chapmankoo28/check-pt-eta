#!/usr/bin/env python3
import json
import os


def fetch_data(url, return_json=False):
    import requests

    print(f"\nFetching {url}...\n")

    response = requests.get(url)  # Prefer using get for a GET request
    response.encoding = "utf-8"  # Explicitly set encoding to 'utf-8'
    # print(response.text)
    if return_json:
        return response.json()
    else:
        return response.text


def get_numeric_route(route):
    import re

    match = re.search(r"\d+", route)
    return int(match.group()) if match else 0


def format_json(json_data):
    formatted_json = {
        "co": json_data.get("co", "KMB"),
        "route": json_data.get("route", ""),
        "bound": json_data.get("bound", "O"),
        "service_type": json_data.get("service_type", "1"),
        "orig_en": json_data.get("orig_en", ""),
        "orig_tc": json_data.get("orig_tc", ""),
        "dest_en": json_data.get("dest_en", ""),
        "dest_tc": json_data.get("dest_tc", ""),
    }

    inbound_json = {
        "co": json_data.get("co", "KMB"),
        "route": json_data.get("route", ""),
        "bound": json_data.get("bound", "I"),
        "service_type": json_data.get("service_type", "1"),
        "orig_en": json_data.get("dest_en", ""),
        "orig_tc": json_data.get("dest_tc", ""),
        "dest_en": json_data.get("orig_en", ""),
        "dest_tc": json_data.get("orig_tc", ""),
    }

    if "bound" not in json_data:
        return [formatted_json, inbound_json]
    else:
        return formatted_json


def remove_duplicates(data):
    from collections import OrderedDict

    unique_routes = OrderedDict()
    for route in data:
        route_id = tuple(sorted(route.items()))
        unique_routes[route_id] = route

    return list(unique_routes.values())


def sort_key(x):
    return get_numeric_route(x["route"])


def load_json(filename):
    with open(filename, "r", encoding="utf-8") as file:
        return json.load(file)


def save_json(data, filename):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)
    print(f"\nSaved {filename}\n")


def timestamp():
    from datetime import datetime

    # ISO format with Local TimeZone information without microsecond
    return str(datetime.now().astimezone().replace(microsecond=0).isoformat())


def main():
    from tqdm import tqdm

    # fetch routs list
    print(f"\nStart formatting bus routes...\n")

    api = load_json("api_config.json")["data"]

    for i in tqdm(api):
        base = i.get("base_url")
        route = i.get("api", "").get("route", "")

        res = fetch_data(base + route, True)

        save_json(res, i.get("co").lower() + "_route_list.json")

    # load route list json
    kmbRouteData = load_json("kmb_route_list.json")["data"]
    ctbRouteData = load_json("ctb_route_list.json")["data"]

    print(f"\nstart merging...\n")

    all_routes = []

    # format json
    for i in tqdm(kmbRouteData):
        i = format_json(i)
        all_routes.append(i)

    print()

    for i in tqdm(ctbRouteData):
        i = format_json(i)
        for ii in i:
            all_routes.append(ii)

    # save json
    # all_routes = remove_duplicates(all_routes)
    all_routes = sorted(all_routes, key=sort_key)
    # all_routes = [dict.fromkeys(all_routes).keys()]
    json_timestamp = {"timestamp": timestamp(), "data": all_routes}

    save_json(json_timestamp, "all_route_list.json")

    for i in ["kmb", "ctb"]:
        if os.path.exists(i + "_route_list.json"):
            os.remove(i + "_route_list.json")

    print(f"\nDone!\n")


if __name__ == "__main__":
    main()
