export function mockCreatePortal(element, target) {
    return (<div>
        <div id="content">{element}</div>
        <div id="target" data-target-tag-name={target.tagName}></div>
    </div>);
}
