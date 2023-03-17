const config = require("config")
const { build_string } = require("./build_string");

function build_wiki_url(result) {
    let wiki_result_url = config.get("ado.wiki.wiki_result_url");
    data = {
        "project": result.wiki.name,
        "path": result.path,
        "path_no_md": result.path.replace(".md", ""),
        "wiki_name": result.wiki.name,
        "wiki_id": result.wiki.id,
        "project_id": result.project.id,
        "content_id": result.contentId,
    }

    return build_string(wiki_result_url, data);
}

module.exports = { build_wiki_url }