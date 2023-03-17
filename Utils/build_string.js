const config = require("config")

// Notice, doesn't support array indexing
function find_json_string_in_object(json_object, path_string) {
    let path_string_converted = path_string.replace("{", "")
    path_string_converted = path_string_converted.replace("}", "")
    path_string_converted = path_string_converted.split('.');
    let result = json_object;
    for (var i = 0; i < path_string_converted.length; i++) {
        let current_key = path_string_converted[i];
        result = result[current_key];
    }

    return result;
}

function build_string_user_inputs(string, requestor_name, message) {
    string = string.replace("{requestor_name}", requestor_name);
    string = string.replace("{message}", message);
    return string;
}

function build_string(string_to_replace, data_object, encode_uri = true) {
    let regex_for_parameters = "\{[a-zA-Z\._]+\}";
    let matches = [...string_to_replace.matchAll(regex_for_parameters)]

    if (string_to_replace.includes("{path_no_md}")) {
        // Special treatment for ADO markdown link creation...
        string_to_replace = string_to_replace.replace("{path_no_md}", data_object.path.replace(".md", ""));
    }

    for (const match of matches) {
        let value = find_json_string_in_object(data_object, match[0]);
        string_to_replace = string_to_replace.replace(match[0], value);
    }

    return encode_uri ? encodeURI(string_to_replace) : string_to_replace;
}

module.exports = { build_string, build_string_user_inputs }