import path from "path"
function generator_profiler_url(){
    var myDate = new Date();
    let d = myDate.getDay() % 4;
    return `/images/profile${d}.jpg`
}
export const PROFILER = generator_profiler_url()

export const MD_FILE_DIR = `posts`
