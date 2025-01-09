function calculateWater() {
    const heights = document.getElementById('input-array').value.split(',').map(Number);
    if (!heights.length) return alert('Enter valid block heights.');

    let totalWater = 0, leftMax = [], rightMax = [];
    heights.reduce((l, h, i) => (leftMax[i] = l = Math.max(l, h)), 0);
    [...heights].reverse().reduce((r, h, i) => (rightMax[heights.length - 1 - i] = r = Math.max(r, h)), 0);

    totalWater = heights.reduce((sum, h, i) =>
        sum + Math.max(0, Math.min(leftMax[i], rightMax[i]) - h), 0);

    // Visualization
    const maxH = Math.max(...heights);
    document.getElementById('visualization').innerHTML = `
        <table>
            ${[...Array(maxH)].map((_, r) => `<tr>${heights.map((h, i) => {
            const water = Math.min(leftMax[i], rightMax[i]) > h && maxH - r <= Math.min(leftMax[i], rightMax[i]);
            const block = maxH - r <= h;
            return `<td class="${block ? 'block' : water ? 'water' : ''}"></td>`;
        }).join('')
            }</tr>`).join('')}
        </table>
        <div id="output">Total Water Trapped: ${totalWater} Units</div>`;
}