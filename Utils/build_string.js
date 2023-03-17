function build_string(source, data) {
    source = source.replace("{project}", data.project);
    source = source.replace("{path}", data.path);
    source = source.replace("{path_no_md}", data.path_no_md);
    source = source.replace("{wiki_name}", data.wiki_name);
    source = source.replace("{wiki_id}", data.wiki_id);
    source = source.replace("{project_id}", data.project_id);
    source = source.replace("{content_id}", data.content_id);
    return encodeURI(source);
}

module.exports = { build_string }