function deleteFirstElementWithClasses(spaceSeparatedClassNames) {
    // 1. Sanitize and convert the input string to a CSS selector
    //    e.g., "class1 class2" becomes ".class1.class2"
    const selector = '.' + spaceSeparatedClassNames
                                .trim() // Remove leading/trailing whitespace
                                .split(/\s+/) // Split by one or more spaces
                                .join('.'); // Join with a dot

    const element = document.querySelector(selector);

    if (element) {
        element.remove();
        console.log(`First element matching selector "${selector}" removed.`);
    } else {
        console.log(`No element found matching selector "${selector}".`);
    }
}

deleteFirstElementWithClasses("gb_Fa gb_Jd gb_2d gb_H gb_Lc gb_e gb_2a gb_Fd")
deleteFirstElementWithClasses("o3j99 LLD4me LS8OJ")
deleteFirstElementWithClasses("FPdoLc lJ9FBc")
deleteFirstElementWithClasses("vcVZ7d")
deleteFirstElementWithClasses("c93Gbe")
