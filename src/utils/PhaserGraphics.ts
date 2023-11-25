export function createRectWithAlpha(scene, x: number, y: number, width: number, height: number, color: number, alpha: number) {
    const bg = scene.add.graphics();

    bg.fillStyle(color, alpha);
    bg.fillRect(x, y, width, height);

    return bg;
}

export function createRoundedRectWithAlpha(scene, x: number, y: number, width: number, height: number, edgeRadius: number, color: number, alpha: number) {
    const bg = scene.add.graphics();

    bg.fillStyle(color, alpha);
    bg.fillRoundedRect(x, y, width, height, edgeRadius);

    return bg;
}